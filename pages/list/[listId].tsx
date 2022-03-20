import {
  ContentWrapper,
  EntriesContainer,
  EntriesContainerProps,
} from "@components/Dict";
import { addCachingHeader, parseError } from "@helper";
import { SITE_NAME } from "@services/constants";
import { parsePaginationParams } from "@services/DatabaseService";
import { findById, VocabularyListModel } from "@services/VocabularyListService";
import { findBy, findByCount } from "@services/VocabularyService/findBy";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

type ListPageProps = {
  list: VocabularyListModel | null;
} & EntriesContainerProps;

export default function ListPage({
  list,
  ...rest
}: ListPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          {list?.name ?? ""} - {SITE_NAME}
        </title>
      </Head>
      <ContentWrapper>
        <h1 className="text-3xl mb-4">{list?.name}</h1>
        <EntriesContainer {...rest} />
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ListPageProps> = async ({
  query: { listId: listIdString, ...params } = {},
  res,
}) => {
  const options = parsePaginationParams(params);
  const listId = Number(listIdString);

  let list = null;
  let vocabularyOptions = null;
  let results = null;
  let count = null;
  let error = null;

  try {
    list = await findById(listId);

    if (!list) {
      return {
        notFound: true,
      };
    }

    vocabularyOptions = {
      ids: list.entryIds,
    };
    [results, count] = await Promise.all([
      findBy({
        ...options,
        ...vocabularyOptions,
      }),
      findByCount(vocabularyOptions),
    ]);
  } catch (e) {
    console.log(e);
    error = parseError(e);
  }

  addCachingHeader(res);

  return {
    props: {
      list,
      results,
      count,
      options,
      error,
    },
  };
};
