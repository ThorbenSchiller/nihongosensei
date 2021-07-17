import React from "react";
import { GetServerSideProps } from "next";
import { EntryModel, FindOptions, list } from "../services/VocabularyService";
import { EntryCard } from "../components/Entry";
import { Link } from "../components/Link";
import RouterLink from "next/link";

type HomeProps = {
  results: EntryModel[];
  options: FindOptions;
};
const DEFAULT_LIMIT = 15;

export default function Home({
  results,
  options = {},
}: HomeProps): JSX.Element {
  const { offset = 0, limit = DEFAULT_LIMIT } = options;

  return (
    <div>
      {results.map((entry) => (
        <EntryCard key={entry.id} entry={entry} className="mb-4" />
      ))}
      <div className="flex justify-between">
        {offset != 0 && (
          <RouterLink
            href={{
              pathname: "/",
              query: {
                offset: offset - limit,
              },
            }}
            passHref={true}
          >
            <Link>previous</Link>
          </RouterLink>
        )}
        <RouterLink
          href={{
            pathname: "/",
            query: {
              offset: offset + limit,
            },
          }}
          passHref={true}
        >
          <Link>next</Link>
        </RouterLink>
      </div>
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
