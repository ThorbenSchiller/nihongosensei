import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-white text-black dark:bg-gray-900 dark:text-white font-normal">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
