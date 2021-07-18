import React from "react";
import { GetServerSideProps } from "next";
import { EntryModel, FindOptions, list } from "../services/VocabularyService";
import { EntryCard } from "../components/Entry";
import { DEFAULT_LIMIT } from "../services/constants";

type HomeProps = {
  results: EntryModel[];
  options: FindOptions;
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

  const options = { offset, limit: DEFAULT_LIMIT };
  const results = await list(options);

  return {
    props: {
      results,
      options,
    },
  };
};
