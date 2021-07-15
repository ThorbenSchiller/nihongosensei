import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { GlobalLoadingContainer } from "../components/LoadingProgress";
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
      <GlobalLoadingContainer>
        <main style={{ maxWidth: 400 }} className="mx-auto">
          <Search />
          <Component {...pageProps} />
        </main>
      </GlobalLoadingContainer>
    </>
  );
}

export default MyApp;
