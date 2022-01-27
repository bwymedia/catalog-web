import { Tabs } from "antd";
import ScenePreviewer from "./ScenePreviewer";

const { TabPane } = Tabs;

interface Props {
  scenes: Scene[];
}

export default function PreviewTabs({ scenes }: Props) {
  return (
    <Tabs tabPosition="left">
      {scenes.map((scene) => (
        <TabPane key={scene.id} tab={scene.name}>
          <ScenePreviewer scene={scene} />
        </TabPane>
      ))}
    </Tabs>
  );
}
