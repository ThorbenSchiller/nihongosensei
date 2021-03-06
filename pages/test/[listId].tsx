import { ContentWrapper } from "@components/Dict";
import { TestWrapper } from "@components/Test";
import { Alert, FlashcardsContainer } from "@components/ui";
import { parseError } from "@helper";
import { SITE_NAME } from "@services/constants";
import { findById, VocabularyListModel } from "@services/VocabularyListService";
import { EntryWrapperModel, findByIds } from "@services/VocabularyService";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

type SearchPageProps = {
  list: VocabularyListModel | null;
  entries: ReadonlyArray<EntryWrapperModel> | null;
  error: string | null;
};

export default function TestPage({
  list,
  entries,
  error,
}: SearchPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          Vokabeltest {list?.name ?? ""} - {SITE_NAME}
        </title>
      </Head>
      <TestWrapper>
        {error && (
          <ContentWrapper>
            <Alert type="error">
              <p>Der Test konnte nicht geladen werden:</p>
              <code>{error}</code>
            </Alert>
          </ContentWrapper>
        )}
        {entries?.length === 0 && (
          <ContentWrapper>
            <Alert type="info">
              <p>Diese Liste ist leer</p>
            </Alert>
          </ContentWrapper>
        )}
        {entries && entries.length > 0 && list && (
          <FlashcardsContainer
            list={list}
            entries={entries.map(({ entry_json }) => entry_json)}
          />
        )}
      </TestWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({
  query: { listId: listIdString },
}) => {
  let list = null;
  let entries = null;
  let error = null;

  try {
    list = await findById(Number(listIdString));

    if (!list) {
      return {
        notFound: true,
      };
    }

    entries = await findByIds(list.entryIds);
  } catch (e) {
    console.log(e);
    error = parseError(e);
  }

  return {
    props: { list, entries, error },
  };
};
