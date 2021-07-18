import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AbsoluteLoadingProgress } from "../components/LoadingProgress";
import "./scrollbar.css";
import "tailwindcss/tailwind.css";

export const SITE_NAME = "日本語先生 Dict";
const SEO_DESCRIPTION =
  "Japanisch-Deutsches Wörterbuch basierend auf wadoku.de Daten";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
