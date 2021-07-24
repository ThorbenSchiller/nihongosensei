import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { EntryModel, findByText } from "../../../../services/VocabularyService";
import { EntryFull, EntryContextProvider } from "../../../../components/Entry";
import { SITE_NAME } from "../../../_app";
import { useScrollHeightPostMessage } from "../../../../components/hooks";

type EmbedByTextPage = {
  entry: EntryModel;
};

export default function EmbedByTextPage({
  entry,
}: EmbedByTextPage): JSX.Element {
  useScrollHeightPostMessage();

  return (
    <>
      <Head>
        <title>
          {entry.form.orth[0]?.value} - {SITE_NAME}
        </title>
      </Head>
      <EntryContextProvider detailBasePath="/embed/entry/byId">
        <EntryFull entry={entry} />
      </EntryContextProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<EmbedByTextPage> = async (
  context
) => {
  const { text } = context.params ?? {};
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

  return {
    props: {
      entry,
    },
  };
};
