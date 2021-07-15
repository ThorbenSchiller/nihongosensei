import React from "react";
import { GetServerSideProps } from "next";
import { EntryModel, findByQuery } from "../../services/VocabularyService";
import { EntryCard } from "../../components/Entry";

type SearchPageProps = {
  query: string;
  results: EntryModel[];
};

export default function SearchPage({ results }: SearchPageProps): JSX.Element {
  return (
    <div>
      {results.map((entry) => (
        <EntryCard key={entry.id} entry={entry} className="mb-4" />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const { q = "" } = context.query;
  const query = Array.isArray(q) ? q[0] : q;

  const results = await findByQuery(query);

  return {
    props: {
      query,
      results,
    },
  };
};
