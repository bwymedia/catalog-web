import { useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Row, Col, Menu, Dropdown, Button, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import catalogLogoSrc from "../assets/catalog_logo.webp";
import whiteLogoSrc from "../assets/white_logo.png";
import CartSummary from "./CartSummary";
import useComponentVisible from "../hooks/useComponentVisible";

const { Header } = Layout;

const items = [
  {
    label: "Drops",
    href: "/",
  },
];

interface Props {
  children?: ReactNode;
  showLinks?: boolean;
  meta?: {
    title?: string;
  };
  cart?: boolean;
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

  // const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // const storeCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  // const { ref, isComponentVisible, setIsComponentVisible } =
  //   useComponentVisible(false);

  // const handleMenuClick = (e) => {
  //   message.info("Click on menu item.");
  //   console.log("click", e);
  // };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet='utf-8' />
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='robots' content='follow, index' />
        <link href='/favicon.png' rel='shortcut icon' />
      </Head>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ padding: "0 12px" }}>
          <Row
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "64px",
            }}>
            <Col
              xs={6}
              md={4}
              lg={2}
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}>
              <Image
                src={whiteLogoSrc}
                alt='Broadway Media'
                height={48}
                width={80}
              />
            </Col>
            <Col
              xs={6}
              md={4}
              lg={2}
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}>
              <Link href='/'>
                <Image
                  src={catalogLogoSrc}
                  alt='Catalog'
                  height={40}
                  width={100}
                />
              </Link>
            </Col>
            <Col xs={6} md={12} lg={18} style={{ height: "100%" }}>
              <Menu
                theme='dark'
                selectedKeys={[router.asPath]}
                mode='horizontal'>
                {items.map((item) => (
                  <Menu.Item key={item.href}>
                    <Link href={item.href}>
                      <a>{item.label}</a>
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Col>
            {/* <Col xs={6} md={4} lg={2} style={{ height: "100%", display: "flex", justifyContent: "flex-end", height: "auto" }}>
              <div ref={ref}>
                <Button
                  className="menu"
                  icon={<ShoppingCartOutlined style={{fontSize: "2rem"}}/>}
                  onClick={() => setIsComponentVisible(!isComponentVisible)}
                  style={{position: "relative", background: "transparent", color: "white", border: "none", height: "100%" }}>
                    <span style={{position: "absolute", margin: "0", fontSize: "1.25rem", height: "40px"}}>
                    {cart.length === 0 ? '' : storeCount}
                    </span>
                </Button>
                {isComponentVisible && <CartSummary cart={cart} />}
                </div>
            </Col> */}
          </Row>
        </Header>
        {children}
      </Layout>
    </>
  );
}
