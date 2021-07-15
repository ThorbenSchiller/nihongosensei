import React from "react";
import { GetServerSideProps } from "next";
import { findById, EntryModel } from "../../services/VocabularyService";
import { EntryCard } from "../../components/Entry";

type EntryDetailPageProps = {
  entry: EntryModel;
};

export default function EntryDetailPage({
  entry,
}: EntryDetailPageProps): JSX.Element {
  return (
    <div>
      <EntryCard entry={entry} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<EntryDetailPageProps> =
  async (context) => {
    const { id } = context.params ?? {};
    const idNumber = Number(Array.isArray(id) ? id[0] : id);

    const entry = await findById(idNumber);

    if (!entry) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        entry,
      },
    };
  };
