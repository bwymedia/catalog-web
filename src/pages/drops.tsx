import { AppstoreOutlined } from "@ant-design/icons";
import { Input, Layout, Menu, Pagination, Row, Space } from "antd";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { unstable_serialize } from "swr";
import { apiFetcher, useApi } from "../api";
import DropCard from "../components/DropCard";

const { Content, Sider } = Layout;

export async function getStaticProps() {
  const key = { path: "drops", params: dropsParams(1, "", "-1") };
  const initialDropsData = await apiFetcher<Drop[]>(key);
  const fallback = {
    [unstable_serialize(key)]: initialDropsData,
  };

  const themesData = await apiFetcher<Theme[]>({ path: "themes" });
  const themes: Theme[] = themesData.data;
  return {
    props: { themes, fallback },
    revalidate: 60,
  };
}

interface Props {
  themes: Theme[];
  fallback: {
    [key: string]: any;
  };
}

export default function Page({ themes, fallback }: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState("");
  const [tag, setTag] = useState("-1");

  const key = { path: "drops", params: dropsParams(pageNumber, filter, tag) };
  const { data: dropsData } = useApi<Drop[]>(key, { fallback });

  const debouncedSetFilter = debounce(setFilter, 300);
  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

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
          selectedKeys={[tag]}
          onSelect={({ key }) => {
            setTag(key);
          }}
          style={{ height: "100%", overflow: "auto" }}
        >
          <Menu.Item key="-1" icon={<AppstoreOutlined />}>
            All
          </Menu.Item>
          {themes.map((theme) => (
            <Menu.Item key={theme.id}>{theme.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: "24px", height: "100%", overflow: "auto" }}>
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Filter by name..."
            allowClear
            onChange={(e) => debouncedSetFilter(e.target.value.toLowerCase())}
            style={{ maxWidth: "500px" }}
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

function dropsParams(pageNumber: number, filter: string, tag: string) {
  const params: ApiParams = {
    "page[number]": pageNumber.toString(),
    "page[size]": "25",
  };
  if (filter) params["filter[name]"] = filter;
  if (tag !== "-1") params["filter[theme_id]"] = tag;
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
