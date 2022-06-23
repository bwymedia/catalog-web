import { Drawer, Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

interface Props {
  visible: boolean;
  setVisible: Function;
  showId: string;
  setShowId: Function;
  shows: Show[];
}

const MobileNavBar = ({
  visible,
  setVisible,
  showId,
  setShowId,
  shows,
}: Props) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className='navbar'>
      <Drawer
        className='mobile-menu'
        title='Shows'
        placement='left'
        // onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}>
        {showId && (
          <Menu
            mode='inline'
            selectedKeys={[showId]}
            onSelect={({ key }) => {
              setShowId(key);
            }}
            style={{ height: "100%", overflow: "auto" }}>
            <Menu.Item key='-1' icon={<AppstoreOutlined />}>
              All
            </Menu.Item>
            {shows.map((show) => (
              <Menu.Item key={show.id}>{show.title}</Menu.Item>
            ))}
          </Menu>
        )}
      </Drawer>
    </nav>
  );
};
export default MobileNavBar;
