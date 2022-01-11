import { Layout } from 'antd';
import type { ReactNode } from 'react';
import TopBar from './TopBar';

const { Header } = Layout;

interface Props {
  children: ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <TopBar />
      </Header>
      {children}
    </Layout>
  );
}
