import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  EntryModel,
  findByQuery,
  FindOptions,
} from "../../services/VocabularyService";
import { EntryCard } from "../../components/Entry";
import { SimplePagination } from "../../components/Pagination";
import { DEFAULT_LIMIT } from "../../services/constants";
import { ContentWrapper } from "../../components/ContentWrapper";
import { SITE_NAME } from "../_app";

type SearchPageProps = {
  query: string;
  results: EntryModel[];
  options: FindOptions;
};

export default function SearchPage({
  results,
  query,
  options = {},
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
        <div>
          {results.map((entry) => (
            <EntryCard key={entry.id} entry={entry} className="mb-4" />
          ))}
        </div>
        <SimplePagination offset={offset} limit={limit} />
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

  const results = await findByQuery(query, options);

  return {
    props: {
      query,
      results,
      options,
    },
  };
};
