import React from "react";
import { GetServerSideProps } from "next";
import { EntryModel, list } from "../services/VocabularyService";
import { EntryCard } from "../components/Entry";

type HomeProps = {
  results: EntryModel[];
};

export default function Home({ results }: HomeProps): JSX.Element {
  return (
    <div>
      {results.map((entry) => (
        <EntryCard key={entry.id} entry={entry} className="mb-4" />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const { offset: offsetString = "1" } = context.query;
  const offset = Number(offsetString) || 0;

  const results = await list({ offset });

  return {
    props: {
      results,
    },
  };
};
