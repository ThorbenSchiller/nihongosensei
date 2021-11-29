import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  findById,
  EntryWrapperModel,
} from "../../../../services/VocabularyService";
import { EntryFull, EntryContextProvider } from "../../../../components/Entry";
import { SITE_NAME } from "../../../_app";
import { useScrollHeightPostMessage } from "../../../../components/hooks";
import { addCachingHeader } from "../../../../helper/addCachingHeader";

type EmbedByIdPage = {
  entry: EntryWrapperModel;
};

export default function EmbedByIdPage({
  entry: { entry_json },
}: EmbedByIdPage): JSX.Element {
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

export const getServerSideProps: GetServerSideProps<EmbedByIdPage> = async ({
  params: { id } = {},
  res,
}) => {
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

  addCachingHeader(res);

  return {
    props: {
      entry,
    },
  };
};
