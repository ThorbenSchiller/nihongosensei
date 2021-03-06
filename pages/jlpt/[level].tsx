import {
  ContentWrapper,
  EntriesContainer,
  EntriesContainerProps,
} from "@components/Dict";
import { addCachingHeader, parseError } from "@helper";
import { SITE_NAME } from "@services/constants";
import { parsePaginationParams } from "@services/DatabaseService";
import { VocabularyFindOptions } from "@services/VocabularyService";
import { findBy, findByCount } from "@services/VocabularyService/findBy";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

type JlptPageProps = {
  level: number;
} & EntriesContainerProps;

export default function JlptPage({
  level,
  ...rest
}: JlptPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          JLPT N{level} - {SITE_NAME}
        </title>
      </Head>
      <ContentWrapper>
        <EntriesContainer {...rest} />
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<JlptPageProps> = async ({
  query: { level = "", ...params } = {},
  res,
}) => {
  const levelNumber = Number(Array.isArray(level) ? level[0] : level) || 5;
  const options = parsePaginationParams(params);
  const vocabularyOptions: VocabularyFindOptions = {
    jlpt: levelNumber,
  };

  let results = null;
  let count = null;
  let error = null;

  try {
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
      level: levelNumber,
      results,
      count,
      options,
      error,
    },
  };
};
