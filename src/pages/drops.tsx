import { AppstoreOutlined } from "@ant-design/icons";
import { Layout, Menu, Pagination, Row, Space } from "antd";
import { useState } from "react";
import fetcher from "../api/fetcher";
import useApi from "../api/useApi";
import DropCard from "../components/DropCard";
import DropSearchForm from "../components/DropSearchForm";

const { Content, Sider } = Layout;

export async function getStaticProps() {
  const { data: shows } = (await fetcher({
    path: "shows",
    params: { sort: "title" },
  })) as ApiDocument<Show[]>;
  const { data: tags } = (await fetcher({
    path: "tags",
    params: { sort: "name" },
  })) as ApiDocument<Tag[]>;
  return {
    props: { shows, tags },
    revalidate: 60,
  };
}

interface Props {
  shows: Show[];
  tags: Tag[];
}

export default function Page({ shows, tags }: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState("");
  const [location, setLocation] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [tagId, setTagId] = useState("");
  const [showId, setShowId] = useState("-1");

  const params: ApiParams = {
    "page[number]": pageNumber.toString(),
    "page[size]": "25",
  };
  if (filter) params["filter[name]"] = filter;
  if (showId !== "-1") params["filter[show_ids]"] = showId;
  if (tagId) params["filter[tag_ids]"] = tagId;
  if (location) params["filter[location]"] = location;
  if (timeOfDay) params["filter[time_of_day]"] = timeOfDay;
  if (filter || showId !== "-1" || tagId || location || timeOfDay) {
    params["sort"] = "name";
  } else {
    params["sort"] = "featured_rank,name";
  }
  const { data: dropsData } = useApi<Drop[]>({ path: "drops", params });

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
          selectedKeys={[showId]}
          onSelect={({ key }) => {
            setShowId(key);
          }}
          style={{ height: "100%", overflow: "auto" }}
        >
          <Menu.Item key="-1" icon={<AppstoreOutlined />}>
            All
          </Menu.Item>
          {shows.map((show) => (
            <Menu.Item key={show.id}>{show.title}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: "24px", height: "100%", overflow: "auto" }}>
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
          <DropSearchForm
            tags={tags}
            onSubmit={({ name, tagId, location, timeOfDay }) => {
              setFilter(name);
              setTagId(tagId);
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
