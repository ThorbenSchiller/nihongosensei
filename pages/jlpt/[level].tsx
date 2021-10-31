import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  EntryWrapperModel,
  findByJlpt,
  findByJlptCount,
  FindOptions,
} from "../../services/VocabularyService";
import { EntryListItem } from "../../components/Entry";
import { DEFAULT_LIMIT } from "../../services/constants";
import { ContentWrapper } from "../../components/ContentWrapper";
import { SITE_NAME } from "../_app";
import { Pagination } from "../../components/Pagination";
import { MinorText } from "../../components/Entry/MinorText";

type JlptPageProps = {
  level: number;
  results: EntryWrapperModel[];
  options: FindOptions;
  count: number;
};

export default function JlptPage({
  level,
  results,
  options = {},
  count,
}: JlptPageProps): JSX.Element {
  const { offset = 0, limit = DEFAULT_LIMIT } = options;

  return (
    <>
      <Head>
        <title>
          JLPT N{level} - {SITE_NAME}
        </title>
      </Head>
      <ContentWrapper>
        <MinorText className="mb-5" component="div">
          <b>{count}</b> Ergebnisse.
        </MinorText>
        <div>
          {results.map(({ entry_json }) => (
            <EntryListItem
              key={entry_json.id}
              entry={entry_json}
              className="mb-3"
            />
          ))}
        </div>
        <Pagination offset={offset} limit={limit} count={count} />
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<JlptPageProps> = async (
  context
) => {
  const { level = "", offset: offsetString = "0" } = context.query;
  const levelNumber = Number(Array.isArray(level) ? level[0] : level) || 5;
  const offset = Number(offsetString) || 0;
  const options = { offset, limit: DEFAULT_LIMIT };

  const [results, count] = await Promise.all([
    findByJlpt(levelNumber, options),
    findByJlptCount(levelNumber),
  ]);

  return {
    props: {
      level: levelNumber,
      results,
      count,
      options,
    },
  };
};