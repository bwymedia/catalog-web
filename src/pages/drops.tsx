import { AppstoreOutlined } from '@ant-design/icons';
import { Input, Layout, Menu, Pagination, Row, Space } from 'antd';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../api';
import DropCard from '../components/DropCard';

const { Content, Sider } = Layout;

interface Props {
  initialDrops: DeserializedApiDocument<Drop[]>;
  themes: Theme[];
}

const pathForOptions = (pageNumber: number, filter: string, tag: string) => {
  const searchParams = new URLSearchParams({
    'page[number]': pageNumber.toString(),
    'page[size]': '25',
  });
  if (filter) searchParams.set('filter[name]', filter);
  if (tag !== '-1') searchParams.set('filter[theme_id]', tag);
  return `drops?${searchParams}`;
};

export default function Page({ initialDrops, themes }: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState('');
  const [tag, setTag] = useState('-1');

  const { data } = useSWR<DeserializedApiDocument<Drop[]>>(
    pathForOptions(pageNumber, filter, tag),
    fetcher,
    {
      fallback: { 'drops?page%5Bnumber%5D=1&page%5Bsize%5D=25': initialDrops },
    }
  );

  let drops;
  let totalDrops = 0;
  if (data) {
    drops = data.data;
    if (data.links.last) {
      const lastPageUrl = new URL(data.links.last);
      const lastPageNumber = lastPageUrl.searchParams.get('page[number]');
      const lastPageSize = lastPageUrl.searchParams.get('page[size]');
      if (lastPageNumber && lastPageSize) {
        totalDrops = parseInt(lastPageNumber) * parseInt(lastPageSize);
      }
    }
  }

  return (
    <Layout>
      <Sider width={200}>
        <Menu
          mode="inline"
          selectedKeys={[tag]}
          onSelect={({ key }) => {
            setTag(key);
          }}
          style={{ height: '100%', overflow: 'auto' }}
        >
          <Menu.Item key="-1" icon={<AppstoreOutlined />}>
            All
          </Menu.Item>
          {themes.map((theme) => (
            <Menu.Item key={theme.id}>{theme.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <Space size="middle" direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Filter by name..."
            allowClear
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
            style={{ maxWidth: '500px' }}
          />
          {drops && (
            <>
              <Row justify="center">
                <Space size="large" wrap align="start">
                  {drops.map((drop) => (
                    <DropCard key={drop.id} drop={drop} />
                  ))}
                </Space>
              </Row>
              <Row justify="center">
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

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const initialDrops = await fetcher<Drop[]>(pathForOptions(1, '', '-1'));
  const { data: themes } = await fetcher<Theme[]>('themes?sort=name');

  return {
    props: {
      initialDrops,
      themes,
    },
  };
};

const dropMatchesFilter = (drop: Drop, filter: string): boolean => {
  if (filter) {
    return drop.name.toLowerCase().includes(filter);
  } else {
    return true;
  }
};
