import React from "react";
import { GetServerSideProps } from "next";
import { Search } from "../components/Search";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";

export default function Home(): JSX.Element | null {
  return (
    <div
      className="h-screen flex flex-col mx-auto text-center p-3"
      style={{ maxWidth: 400 }}
    >
      <div className="w-full flex flex-col flex-grow justify-center items-center">
        <Logo className="mb-8" size="big" />
        <Search className="w-full mb-8" />
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
