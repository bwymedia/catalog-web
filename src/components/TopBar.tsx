import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import catalogLogoSrc from "../assets/catalog_logo.webp";
import whiteLogoSrc from "../assets/white_logo.png";

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

export default function TopBar() {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          float: "left",
          height: "100%",
        }}
      >
        <Image src={whiteLogoSrc} alt="Broadway Media" height={48} width={80} />
        <div style={{ width: "1em" }}></div>
        <Image src={catalogLogoSrc} alt="Catalog" height={40} width={100} />
        <div style={{ width: "1em" }}></div>
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
