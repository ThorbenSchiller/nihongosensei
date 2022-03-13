import { Footer, Link, Logo, Search } from "@components/ui";
import type { GetStaticProps } from "next";
import Head from "next/head";
import RouterLink from "next/link";
import React from "react";

export default function Home(): JSX.Element | null {
  return (
    <>
      <Head>
        <meta key="robots" name="robots" content="index, nofollow" />
      </Head>
      <div
        className="h-screen flex flex-col mx-auto text-center p-3"
        style={{ maxWidth: 400 }}
      >
        <div className="w-full flex flex-col flex-grow justify-center items-center">
          <Logo className="mb-8" size="big" />
          <Search className="w-full mb-8" autoFocus={true} />
          <p>
            Weitere Links:{" "}
            <RouterLink href="/furigana" passHref={true}>
              <Link>Furigana Generator</Link>
            </RouterLink>
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
