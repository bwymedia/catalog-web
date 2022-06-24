import * as React from "react";
import {
  Layout,
  Menu,
  Pagination,
  Row,
  Col,
  Space,
  Drawer,
  Button,
} from "antd";
import { useState } from "react";
import useApi from "../api/useApi";
import DropCard from "./DropCard";
import DropSearchForm from "./DropSearchForm";
import MobileNavBar from "./MobileNavBar";
import { MenuFoldOutlined } from "@ant-design/icons";
import Image from "next/image";
import { AppstoreOutlined } from "@ant-design/icons";

import whiteLogoSrc from "../assets/white_logo.png";

const { Content, Sider } = Layout;

interface Props {
  shows: Show[];
  tags: Tag[];
}

export default function DropsIndex({ shows, tags }: Props) {
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

  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(false);
  };

  return (
    <Layout>
      <MobileNavBar
        visible={visible}
        setVisible={setVisible}
        showId={showId}
        setShowId={setShowId}
        shows={shows}
      />
      <Sider
        className='sidebar lg+'
        breakpoint={"lg"}
        theme='light'
        collapsedWidth={0}
        trigger={null}>
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
      </Sider>
      <Content style={{ padding: "0 12px", height: "100%", overflow: "auto" }}>
        <Space size='middle' direction='vertical' style={{ width: "100%" }}>
          <DropSearchForm
            tags={tags}
            onSubmit={({ name, tagId, location, timeOfDay }) => {
              setFilter(name);
              setTagId(tagId);
              setLocation(location);
              setTimeOfDay(timeOfDay);
            }}>
            <div
              className='d-block d-lg-none'
              style={{ height: "100%", marginTop: "12px" }}>
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
                <span style={{ marginLeft: "-32px" }}>Drops</span>
              </h1>
            </div>
          </DropSearchForm>
          {drops && (
            <>
              <Row gutter={[16, 16]}>
                {drops.map((drop) => (
                  <Col key={drop.id} xs={24} md={12} lg={8} xl={6} xxl={4}>
                    <DropCard drop={drop} />
                  </Col>
                ))}
              </Row>
              <Row justify='center'>
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
