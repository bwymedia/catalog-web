import { Tabs } from "antd";
import ScenePreviewer from "./ScenePreviewer";

const { TabPane } = Tabs;

interface Props {
  scenes: Scene[];
  curtainWarmer?: string;
}

export default function PreviewTabs({ scenes, curtainWarmer }: Props) {
  return (
    <>
      <p className='d-lg-none' style={{ textAlign: "center" }}>
        Please use the menu to select a show
      </p>
      <Tabs tabPosition='left' tabBarStyle={{ width: "350px" }}>
        {curtainWarmer && (
          <TabPane tab='Curtain Warmer' styles={{ display: "flex" }}>
            <video
              className='shows-preview-video'
              src={curtainWarmer}
              // height='360'
              controls
              style={{ width: "100%" }}
              preload='metadata'></video>
          </TabPane>
        )}
        {scenes.map((scene) => (
          <TabPane key={scene.id} tab={scene.name}>
            <ScenePreviewer scene={scene} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}
