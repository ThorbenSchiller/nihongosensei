import { EntryContextProvider, EntryFull } from "@components/Dict";
import { useScrollHeightPostMessage } from "@components/hooks";
import { addCachingHeader } from "@helper";
import { SITE_NAME } from "@services/constants";
import type { EntryWrapperModel } from "@services/VocabularyService";
import { findByText } from "@services/VocabularyService";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

type EmbedByTextPage = {
  entry: EntryWrapperModel;
};

export default function EmbedByTextPage({
  entry: { entry_json },
}: EmbedByTextPage): JSX.Element {
  useScrollHeightPostMessage();

  return (
    <>
      <Head>
        <title>
          {entry_json.form.orth[0]?.value} - {SITE_NAME}
        </title>
      </Head>
      <EntryContextProvider detailBasePath="/embed/entry/byId">
        <EntryFull entry={entry_json} />
      </EntryContextProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<EmbedByTextPage> = async ({
  params: { text } = {},
  res,
}) => {
  if (!text) {
    return {
      notFound: true,
    };
  }
  const singleText = Array.isArray(text) ? text[0] : text;

  const entry = await findByText(singleText);

  if (!entry) {
    return {
      notFound: true,
    };
  }

  addCachingHeader(res);

  return {
    props: {
      entry,
    },
  };
};
