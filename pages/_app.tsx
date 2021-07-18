import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AbsoluteLoadingProgress } from "../components/LoadingProgress";
import "./scrollbar.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Furigana Generator</title>
        <meta
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          name="viewport"
        />
      </Head>
      <AbsoluteLoadingProgress />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
