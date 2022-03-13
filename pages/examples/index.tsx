import { ContentWrapper, EntryFull } from "@components/Dict";
import { SITE_NAME } from "@services/constants";
import { EntryWrapperModel, findByIds } from "@services/VocabularyService";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

type ExamplePageProps = {
  results: EntryWrapperModel[];
};

export default function ExamplePage({
  results,
}: ExamplePageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Beispiele - {SITE_NAME}</title>
      </Head>
      <ContentWrapper>
        <div>
          {results.map(({ entry_json }) => (
            <EntryFull
              key={entry_json.id}
              entry={entry_json}
              className="mb-4"
            />
          ))}
        </div>
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  ExamplePageProps
> = async () => {
  const ids = [
    7253900, 167612, 1707, 273, 208, 515, 4029690, 4151, 8042046, 11712, 8545,
    490814, 2516676, 3778315, 8444455, 8444455, 5075870, 226081, 10000528,
    5260527, 2972828,
  ];
  const results = await findByIds(ids);

  return {
    props: {
      results,
    },
  };
};
