import "../sass/styles.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "@components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </>
  );
}
