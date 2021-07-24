import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  EntryModel,
  findByQuery,
  findByQueryCount,
  FindOptions,
} from "../../services/VocabularyService";
import { EntryCard } from "../../components/Entry";
import { DEFAULT_LIMIT } from "../../services/constants";
import { ContentWrapper } from "../../components/ContentWrapper";
import { SITE_NAME } from "../_app";
import { Pagination } from "../../components/Pagination";
import { MinorText } from "../../components/Entry/MinorText";

type SearchPageProps = {
  query: string;
  results: EntryModel[];
  options: FindOptions;
  count: number;
};

export default function SearchPage({
  results,
  query,
  options = {},
  count,
}: SearchPageProps): JSX.Element {
  const { offset = 0, limit = DEFAULT_LIMIT } = options;

  return (
    <>
      <Head>
        <title>
          Suche {query} - {SITE_NAME}
        </title>
      </Head>
      <ContentWrapper>
        <MinorText className="mb-5" component="div">
          <b>{count}</b> Ergebnisse.
        </MinorText>
        <div>
          {results.map((entry) => (
            <EntryCard key={entry.id} entry={entry} className="mb-4" />
          ))}
        </div>
        <Pagination offset={offset} limit={limit} count={count} />
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const { q = "", offset: offsetString = "0" } = context.query;
  const query = Array.isArray(q) ? q[0] : q;
  const offset = Number(offsetString) || 0;
  const options = { offset, limit: DEFAULT_LIMIT };

  const [results, count] = await Promise.all([
    findByQuery(query, options),
    findByQueryCount(query),
  ]);

  return {
    props: {
      query,
      results,
      count,
      options,
    },
  };
};
