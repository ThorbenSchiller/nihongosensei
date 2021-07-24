import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { findById, EntryModel } from "../../../../services/VocabularyService";
import { EntryFull, EntryContextProvider } from "../../../../components/Entry";
import { SITE_NAME } from "../../../_app";
import { useScrollHeightPostMessage } from "../../../../components/hooks";

type EmbedByIdPage = {
  entry: EntryModel;
};

export default function EmbedByIdPage({ entry }: EmbedByIdPage): JSX.Element {
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

export const getServerSideProps: GetServerSideProps<EmbedByIdPage> = async (
  context
) => {
  const { id } = context.params ?? {};
  const idNumber = Number(Array.isArray(id) ? id[0] : id);
  if (isNaN(idNumber)) {
    return {
      notFound: true,
    };
  }

  const entry = await findById(idNumber);

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
