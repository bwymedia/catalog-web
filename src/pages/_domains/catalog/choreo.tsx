import * as React from "react";
import { Layout, Menu, Divider, Typography } from "antd";
import { useState } from "react";
import fetcher from "../../../api/fetcher";
import PageLayout from "../../../components/PageLayout";

const { Content, Sider } = Layout;
const { Title } = Typography;

interface Props {
  choreoGuides: ChoreoGuide[];
}

export async function getStaticProps() {
  const { data: choreoGuides } = (await fetcher({
    path: "choreo-guides",
  })) as ApiDocument<ChoreoGuide[]>;
  return {
    props: { choreoGuides },
    revalidate: 60,
  };
}

export default function Choreo({ choreoGuides }: Props) {
  const [selectedGuide, setSelectedGuide] = useState<ChoreoGuide>();
  const shows = choreoGuides.map((guide) => ({
    title: guide.showTitle,
    slug: guide.slug,
  }));

  return (
    <PageLayout showLinks>
      <Layout>
        <Sider width={300}>
          <Menu
            mode="inline"
            style={{ height: "100%", overflow: "auto" }}
            onSelect={({ key }) => {
              const guide = choreoGuides.find((guide) => guide.slug === key);
              if (guide) {
                setSelectedGuide(guide);
              }
            }}
          >
            {shows.map((show) => (
              <Menu.Item key={show.slug}>{show.title}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content style={{ padding: "24px", height: "100%", overflow: "auto" }}>
          {selectedGuide && (
            <Typography>
              <Title>{selectedGuide.showTitle}</Title>
              <Divider />
              {selectedGuide.songs.map((song) => (
                <>
                  <Title level={2}>{song.name}</Title>
                  {song.previewVideo && (
                    <video
                      src={song.previewVideo}
                      height="360"
                      controls
                      preload="metadata"
                    ></video>
                  )}
                </>
              ))}
            </Typography>
          )}
        </Content>
      </Layout>
    </PageLayout>
  );
}
