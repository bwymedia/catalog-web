import { Tabs } from "antd";
import ScenePreviewer from "./ScenePreviewer";

const { TabPane } = Tabs;

interface Props {
  scenes: Scene[];
  curtainWarmer?: string;
}

export default function PreviewTabs({ scenes, curtainWarmer }: Props) {
  return (
    <Tabs tabPosition="left" tabBarStyle={{ maxWidth: "400px" }}>
      {curtainWarmer && (
        <TabPane tab="Curtain Warmer">
          <video
            src={curtainWarmer}
            height="360"
            controls
            preload="metadata"
          ></video>
        </TabPane>
      )}
      {scenes.map((scene) => (
        <TabPane key={scene.id} tab={scene.name}>
          <ScenePreviewer scene={scene} />
        </TabPane>
      ))}
    </Tabs>
  );
}
