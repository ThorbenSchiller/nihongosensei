import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { ContentWrapper } from "../../components/ContentWrapper";
import { EntryListItem } from "../../components/Entry";
import { MinorText } from "../../components/Entry/MinorText";
import { Pagination } from "../../components/Pagination";
import { addCachingHeader } from "../../helper/addCachingHeader";
import { DEFAULT_LIMIT } from "../../services/constants";
import {
  EntryWrapperModel,
  findByQuery,
  findByQueryCount,
  FindOptions,
} from "../../services/VocabularyService";
import { SITE_NAME } from "../_app";

type SearchPageProps = {
  query: string;
  results: EntryWrapperModel[];
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

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({
  query: { q = "", offset: offsetString = "0" },
  res,
}) => {
  const query = Array.isArray(q) ? q[0] : q;
  const offset = Number(offsetString) || 0;
  const options = { offset, limit: DEFAULT_LIMIT };

  const [results, count] = await Promise.all([
    findByQuery(query, options),
    findByQueryCount(query),
  ]);

  addCachingHeader(res, {
    maxAgeInSeconds: 60,
    staleAgeInSeconds: 60,
  });

  return {
    props: {
      query,
      results,
      count,
      options,
    },
  };
};
