import { Layout, Menu, Drawer, Button } from "antd";
import { useEffect, useState } from "react";
import useApi from "../../api/useApi";
import PageLayout from "../../components/PageLayout";
import PreviewTabs from "../../components/PreviewTabs";
import MobileNavBar from "../../components/MobileNavBar";
import { MenuFoldOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function Page() {
  const [packageId, setPackageId] = useState("");
  const { data: showsData } = useApi<Show[]>({
    path: "shows",
    params: {
      include: "packages",
      sort: "title",
      "fields[packages]": "name",
    },
  });
  const { data: packageData } = useApi<Package>(
    packageId && {
      path: `packages/${packageId}`,
      params: { include: "scenes" },
    }
  );
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [visible, setVisible] = useState(false);

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
    <PageLayout showLinks>
      <nav className='navbar d-lg-none'>
        <Drawer
          className='mobile-menu'
          title='Shows'
          placement='left'
          onClick={() => setVisible(false)}
          onClose={() => setVisible(false)}
          visible={visible}>
          <Menu
            mode='inline'
            style={{ height: "100%", overflow: "auto" }}
            onSelect={({ key }) => {
              const match = key.match(/package-(\d+)/);
              if (match) {
                setScenes([]);
                setPackageId(match[1]);
              }
            }}>
            {shows.map((show) => {
              if (show.packages && show.packages.length > 1) {
                return (
                  <SubMenu key={`show-${show.id}`} title={show.title}>
                    {show.packages.map((p) => (
                      <Menu.Item key={`package-${p.id}`}>{p.name}</Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else if (show.packages && show.packages.length === 1) {
                return (
                  <Menu.Item key={`package-${show.packages[0].id}`}>
                    {show.packages[0].name === "Regular"
                      ? show.title
                      : show.title + " " + show.packages[0].name}
                  </Menu.Item>
                );
              } else {
                return null;
              }
            })}
          </Menu>
        </Drawer>
      </nav>
      <Layout>
        <Sider width={300} className='d-none d-lg-block'>
          <Menu
            mode='inline'
            style={{ height: "100%", overflow: "auto" }}
            onSelect={({ key }) => {
              const match = key.match(/package-(\d+)/);
              if (match) {
                setScenes([]);
                setPackageId(match[1]);
              }
            }}>
            {shows.map((show) => {
              if (show.packages && show.packages.length > 1) {
                return (
                  <SubMenu key={`show-${show.id}`} title={show.title}>
                    {show.packages.map((p) => (
                      <Menu.Item key={`package-${p.id}`}>{p.name}</Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else if (show.packages && show.packages.length === 1) {
                return (
                  <Menu.Item key={`package-${show.packages[0].id}`}>
                    {show.packages[0].name === "Regular"
                      ? show.title
                      : show.title + " " + show.packages[0].name}
                  </Menu.Item>
                );
              } else {
                return null;
              }
            })}
          </Menu>
        </Sider>
        <Content style={{ padding: "12px", height: "100%", overflow: "auto" }}>
          <div className='d-block d-lg-none' style={{ marginTop: "12px" }}>
            <Button
              id='mobile-menu-button'
              className='menu'
              type='primary'
              icon={<MenuFoldOutlined style={{ fontSize: "1.5rem" }} />}
              onClick={() => setVisible(true)}
              style={{
                fontSize: "1.5rem",
                margin: "0",
                float: "left",
                marginTop: "3px",
                marginBottom: "auto",
              }}
            />
            <h1
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                marginBottom: 0,
              }}>
              <span style={{ marginLeft: "-32px" }}>Shows</span>
            </h1>
          </div>
          <PreviewTabs
            scenes={scenes}
            curtainWarmer={packageData?.data?.curtainWarmerPreview}
          />
        </Content>
      </Layout>
    </PageLayout>
  );
}
