import type { AppProps } from "next/app";
import Head from "next/head";
import PageLayout from "../components/PageLayout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Head>
        <title>Broadway Media Catalog</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </PageLayout>
  );
}
