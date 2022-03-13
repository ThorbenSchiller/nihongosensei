import { ContentWrapper, EntryListItem } from "@components/Dict";
import { Pagination } from "@components/Pagination";
import { Alert, MinorText } from "@components/ui";
import { addCachingHeader, parseError } from "@helper";
import { DEFAULT_LIMIT, SITE_NAME } from "@services/constants";
import {
  EntryWrapperModel,
  findByQuery,
  findByQueryCount,
  FindOptions,
} from "@services/VocabularyService";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

type SearchPageProps = {
  query: string;
  options: FindOptions;
  results: ReadonlyArray<EntryWrapperModel> | null;
  count: number | null;
  error: string | null;
};

export default function SearchPage({
  results,
  query,
  options = {},
  count,
  error,
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
        {error && (
          <Alert type="error">
            <p>Ihre Suchanfrage konnte leider nicht bearbeitet werden:</p>
            <code>{error}</code>
          </Alert>
        )}
        {count === 0 && <Alert type="info">Keine Ergebnisse gefunden.</Alert>}
        {results && count !== null && count > 0 && (
          <>
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
          </>
        )}
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

  let results = null;
  let count = null;
  let error = null;

  try {
    [results, count] = await Promise.all([
      findByQuery(query, options),
      findByQueryCount(query),
    ]);
  } catch (e) {
    console.log(e);
    error = parseError(e);
  }

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
      error,
    },
  };
};
