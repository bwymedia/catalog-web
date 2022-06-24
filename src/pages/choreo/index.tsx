import * as React from "react";
import { Layout, Menu, Divider, Drawer, Button, Typography } from "antd";
import { useState } from "react";
import fetcher from "../../api/fetcher";
import PageLayout from "../../components/PageLayout";
import ChoreoGuidePreviewer from "../../components/ChoreoGuidePreviewer";
import { MenuFoldOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;
const { Title } = Typography;

interface Props {
  choreoGuides: ChoreoGuide[];
  onClick?: () => void;
}

export async function getStaticProps() {
  const { data: choreoGuides } = (await fetcher({
    path: "choreo-guides",
    params: {
      include: "show",
    },
  })) as ApiDocument<ChoreoGuide[]>;
  return {
    props: { choreoGuides },
    revalidate: 60,
  };
}

export default function Choreo({ choreoGuides }: Props) {
  const [selectedGuide, setSelectedGuide] = useState<ChoreoGuide>();
  const [visible, setVisible] = useState(false);

  const shows = choreoGuides.map((guide) => ({
    title: guide.show.title,
    slug: guide.slug,
  }));

  const onClick = () => {
    setVisible(false);
  };

  return (
    <PageLayout showLinks>
      <Layout>
        <nav className='navbar d-lg-none'>
          <Drawer
            className='mobile-menu'
            title='Choreo'
            placement='left'
            onClose={onClick}
            visible={visible}>
            <Menu
              mode='inline'
              style={{ height: "100%", overflow: "auto" }}
              onClick={onClick}
              onSelect={({ key }) => {
                const guide = choreoGuides.find((guide) => guide.slug === key);
                if (guide) {
                  setSelectedGuide(guide);
                }
              }}>
              {shows.map((show) => (
                <Menu.Item key={show.slug}>{show.title}</Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </nav>
        <Sider className='d-none d-lg-block' width={300}>
          <Menu
            mode='inline'
            style={{ height: "100%", overflow: "auto" }}
            onSelect={({ key }) => {
              const guide = choreoGuides.find((guide) => guide.slug === key);
              if (guide) {
                setSelectedGuide(guide);
              }
            }}>
            {shows.map((show) => (
              <Menu.Item key={show.slug}>{show.title}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content style={{ padding: "24px", height: "100%", overflow: "auto" }}>
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
              <span style={{ marginLeft: "-32px" }}>Choreo</span>
            </h1>
          </div>
          <p className='d-lg-none' style={{ textAlign: "center" }}>
            Please use the menu to select a show
          </p>
          {selectedGuide && (
            <Typography>
              <Title level={3}>{selectedGuide.show.title}</Title>
              <Divider />
              <ChoreoGuidePreviewer guide={selectedGuide} level={2} />
            </Typography>
          )}
        </Content>
      </Layout>
    </PageLayout>
  );
}
