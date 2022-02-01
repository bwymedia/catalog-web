import { AppstoreOutlined } from "@ant-design/icons";
import { Layout, Menu, Pagination, Row, Space } from "antd";
import { useState } from "react";
import { unstable_serialize } from "swr";
import { apiFetcher, useApi } from "../api";
import DropCard from "../components/DropCard";
import DropSearchForm from "../components/DropSearchForm";

const { Content, Sider } = Layout;

export async function getStaticProps() {
  const showsData = await apiFetcher<DropTag[]>({
    path: "drop-tags",
    params: { "filter[kind]": "show" },
  });
  const shows: DropTag[] = showsData.data;

  const stylesData = await apiFetcher<DropTag[]>({
    path: "drop-tags",
    params: { "filter[kind]": "style" },
  });
  const styles: DropTag[] = stylesData.data;

  return {
    props: { shows, styles },
    revalidate: 60,
  };
}

interface Props {
  shows: DropTag[];
  styles: DropTag[];
}

export default function Page({ shows, styles }: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState("");
  const [location, setLocation] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [style, setStyle] = useState("");
  const [show, setShow] = useState("-1");

  const dropsKey = {
    path: "drops",
    params: dropsParams(pageNumber, filter, show, style, location, timeOfDay),
  };
  const { data: dropsData } = useApi<Drop[]>(dropsKey, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  let totalDrops = 0;
  let drops: Drop[] = [];
  if (dropsData) {
    totalDrops = parseTotal(dropsData.links);
    drops = dropsData.data;
  }

  return (
    <Layout>
      <Sider width={200}>
        <Menu
          mode="inline"
          selectedKeys={[show]}
          onSelect={({ key }) => {
            setShow(key);
          }}
          style={{ height: "100%", overflow: "auto" }}
        >
          <Menu.Item key="-1" icon={<AppstoreOutlined />}>
            All
          </Menu.Item>
          {shows.map((show) => (
            <Menu.Item key={show.id}>{show.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: "24px", height: "100%", overflow: "auto" }}>
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
          <DropSearchForm
            styles={styles}
            onSubmit={({ name, style, location, timeOfDay }) => {
              setFilter(name);
              setStyle(style);
              setLocation(location);
              setTimeOfDay(timeOfDay);
            }}
          />
          {drops && (
            <>
              <Row justify="center">
                <Space size="large" wrap align="start">
                  {drops.map((drop) => (
                    <DropCard key={drop.id} drop={drop} />
                  ))}
                </Space>
              </Row>
              <Row justify="center">
                <Pagination
                  pageSize={25}
                  current={pageNumber}
                  total={totalDrops}
                  onChange={setPageNumber}
                  showSizeChanger={false}
                />
              </Row>
            </>
          )}
        </Space>
      </Content>
    </Layout>
  );
}

function dropsParams(
  pageNumber: number,
  filter: string,
  show: string,
  style: string,
  location: string,
  timeOfDay: string
) {
  const params: ApiParams = {
    "page[number]": pageNumber.toString(),
    "page[size]": "25",
  };
  if (filter) params["filter[name]"] = filter;
  if (show !== "-1") params["filter[drop_tag_ids]"] = show;
  if (location) params["filter[location]"] = location;
  if (timeOfDay) params["filter[time_of_day]"] = timeOfDay;
  const dropTagIds = [];
  if (show !== "-1") dropTagIds.push(show);
  if (style) dropTagIds.push(style);
  if (dropTagIds.length > 0)
    params["filter[drop_tag_ids]"] = dropTagIds.join(",");
  return params;
}

function parseTotal({ last }: PageLinks) {
  if (!last) return 0;
  const url = new URL(last);
  const lastPageNumber = url.searchParams.get("page[number]");
  const lastPageSize = url.searchParams.get("page[size]");
  if (lastPageNumber && lastPageSize) {
    return parseInt(lastPageNumber) * parseInt(lastPageSize);
  } else {
    return 0;
  }
}
