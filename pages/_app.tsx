import "../sass/styles.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "@components/Layout/Layout";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </SessionProvider>
    </>
  );
}
