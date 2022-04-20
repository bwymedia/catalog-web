import { Layout } from "antd";
import Head from "next/head";
import type { ReactNode } from "react";
import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import catalogLogoSrc from "../assets/catalog_logo.webp";
import whiteLogoSrc from "../assets/white_logo.png";
import { useRouter } from "next/router";

const { Header } = Layout;

const items = [
  {
    text: "Shows",
    href: "/shows",
  },
  {
    text: "Drops",
    href: "/drops",
  },
];

interface Props {
  children?: ReactNode;
  showLinks?: boolean;
  meta?: {
    title?: string;
  };
}

export default function PageLayout({
  children,
  showLinks,
  meta: pageMeta,
}: Props) {
  const router = useRouter();
  const meta = {
    title: "Broadway Media Catalog",
    ...pageMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="follow, index" />
        <link href="/favicon.png" rel="shortcut icon" />
      </Head>
      <Layout style={{ height: "100vh" }}>
        <Header>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              float: "left",
              height: "100%",
            }}
          >
            <Image
              src={whiteLogoSrc}
              alt="Broadway Media"
              height={48}
              width={80}
            />
            <div style={{ width: "1em" }}></div>
            <Image src={catalogLogoSrc} alt="Catalog" height={40} width={100} />
            <div style={{ width: "1em" }}></div>
          </div>
          {showLinks && (
            <Menu theme="dark" mode="horizontal" selectedKeys={[router.asPath]}>
              {items.map((item) => (
                <Menu.Item key={item.href}>
                  <Link href={item.href}>
                    <a>{item.text}</a>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          )}
        </Header>
        {children}
      </Layout>
    </>
  );
}
