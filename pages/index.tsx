import { Col, Divider, Layout, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import { deserialize } from 'json-api-deserialize';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import DropCard from '../components/DropCard';

const { Content } = Layout;

const Home: NextPage = () => {
  const [drops, setDrops] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://accounts.broadwaymedia.com/api/v2/drops')
      .then((response) => response.json())
      .then((json_response) => deserialize(json_response))
      .then(({ data }) => setDrops(data));
    return () => {};
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#394263' }}>
      <Content
        style={{
          backgroundColor: 'white',
          margin: '24px 48px',
          padding: '24px',
          borderRadius: '10px',
        }}
      >
        <Title>Broadway Media Catalog</Title>
        <Divider />
        <Row gutter={[16, 16]}>
          {drops.map((drop) => (
            <Col key={drop.id} span={4}>
              <DropCard drop={drop} />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
