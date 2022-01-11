import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const items = [
  {
    text: 'Shows',
    href: '/shows',
  },
  {
    text: 'Drops',
    href: '/drops',
  },
];

export default function TopBar() {
  const router = useRouter();

  return (
    <>
      <div style={{ float: 'left', marginRight: '24px', color: 'white' }}>
        <Link href="/">
          <a>Broadway Media Catalog</a>
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal" selectedKeys={[router.asPath]}>
        {items.map((item) => (
          <Menu.Item key={item.href}>
            <Link href={item.href}>
              <a>{item.text}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}
