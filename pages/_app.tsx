import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AbsoluteLoadingProgress } from "../components/LoadingProgress";
import "./scrollbar.css";
import "tailwindcss/tailwind.css";
import { Search } from "../components/Search";

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
      <main style={{ maxWidth: 400 }} className="mx-auto p-3">
        <Search />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
