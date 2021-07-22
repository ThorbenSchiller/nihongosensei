import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { EntryModel, findByIds } from "../../services/VocabularyService";
import { EntryCard } from "../../components/Entry";
import { ContentWrapper } from "../../components/ContentWrapper";
import { SITE_NAME } from "../_app";

type ExamplePageProps = {
  results: EntryModel[];
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
          {results.map((entry) => (
            <EntryCard key={entry.id} entry={entry} className="mb-4" />
          ))}
        </div>
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ExamplePageProps> =
  async () => {
    const ids = [
      7253900, 167612, 1707, 273, 208, 515, 4029690, 4151, 8042046, 11712, 8545,
      490814, 2516676, 3778315, 8444455, 8444455, 5075870, 226081, 10000528,
      5260527,
    ];
    const results = await findByIds(ids);

    return {
      props: {
        results,
      },
    };
  };
