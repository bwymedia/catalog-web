import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { apiFetcher, useApi } from "../api";
import PreviewTabs from "../components/PreviewTabs";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function Page() {
  const [packageId, setPackageId] = useState("");
  const { data: showsData } = useApi<Show[]>({
    path: "shows",
    params: { include: "packages", sort: "title" },
  });
  const { data: packageData } = useSWR<ApiDocument<Package>>(
    packageId && {
      path: `packages/${packageId}`,
      params: { include: "scenes" },
    },
    apiFetcher
  );
  const [scenes, setScenes] = useState<Scene[]>([]);

  useEffect(() => {
    if (!packageData || !packageData.data) return;

    const newScenes = [...packageData.data.scenes];
    newScenes.sort((a, b) =>
      a.actOrder === b.actOrder
        ? a.sceneOrder - b.sceneOrder
        : a.actOrder - b.actOrder
    );
    setScenes(newScenes);
  }, [packageData]);

  let shows = showsData && showsData.data ? showsData.data : [];

  return (
    <Layout>
      <Sider width={300}>
        <Menu
          mode="inline"
          style={{ height: "100%", overflow: "auto" }}
          onSelect={({ key }) => {
            const match = key.match(/package-(\d+)/);
            if (match) {
              setPackageId(match[1]);
            }
          }}
        >
          {shows.map((show) => {
            if (show.packages.length > 1) {
              return (
                <SubMenu key={`show-${show.id}`} title={show.title}>
                  {show.packages.map((p) => (
                    <Menu.Item key={`package-${p.id}`}>{p.name}</Menu.Item>
                  ))}
                </SubMenu>
              );
            } else if (show.packages.length === 1) {
              return (
                <Menu.Item key={`package-${show.packages[0].id}`}>
                  {show.title}
                </Menu.Item>
              );
            } else {
              return null;
            }
          })}
        </Menu>
      </Sider>
      <Content style={{ padding: "24px", height: "100%", overflow: "auto" }}>
        <PreviewTabs scenes={scenes} />
      </Content>
    </Layout>
  );
}
