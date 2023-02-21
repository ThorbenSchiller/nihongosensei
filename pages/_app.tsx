import { AbsoluteLoadingProgress } from "@components/ui";
import { SEO_DESCRIPTION, SITE_NAME } from "@services/constants";
import { init } from "@socialgouv/matomo-next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import "./scrollbar.css";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    if (MATOMO_URL && MATOMO_SITE_ID) {
      init({
        url: MATOMO_URL,
        siteId: MATOMO_SITE_ID,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          name="viewport"
        />
        <meta key="description" name="description" content={SEO_DESCRIPTION} />
        <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
        <meta
          key="og:description"
          property="og:description"
          content={SEO_DESCRIPTION}
        />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="robots" name="robots" content="noindex" />
      </Head>
      <AbsoluteLoadingProgress />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
