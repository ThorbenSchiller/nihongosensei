import { SITE_NAME } from "@services/constants";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="de">
        <Head>
          <link
            rel="search"
            type="application/opensearchdescription+xml"
            title={`Suche - ${SITE_NAME}`}
            href="/opensearch.xml"
          />
          {process.env.NODE_ENV === "production" && (
            <script
              async
              defer
              data-domain="dict.nihongosensei.app"
              src="https://stats.nihongosensei.app/js/plausible.js"
            />
          )}
        </Head>
        <body className="bg-white text-black dark:bg-gray-900 dark:text-white font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
