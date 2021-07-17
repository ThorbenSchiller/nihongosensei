import React from "react";
import { GetServerSideProps } from "next";
import {
  findById,
  EntryModel,
  findByIds,
} from "../../services/VocabularyService";
import { EntryCard, RelatedEntries } from "../../components/Entry";
import { OtherReadings } from "../../components/Entry/OtherReadings";

type EntryDetailPageProps = {
  entry: EntryModel;
  relatedEntries: EntryModel[];
};

export default function EntryDetailPage({
  entry,
  relatedEntries,
}: EntryDetailPageProps): JSX.Element {
  return (
    <div>
      <EntryCard entry={entry} />
      <OtherReadings orth={entry.form.orth} />
      <RelatedEntries entries={relatedEntries} />
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

    // resolve relations
    const relationIds = entry.ruigos?.ruigo
      .map((related) => related.id)
      .filter((id) => id !== entry.id);
    let relatedEntries: EntryModel[] = [];
    if (relationIds?.length) {
      relatedEntries = await findByIds(relationIds);
    }

    return {
      props: {
        entry,
        relatedEntries,
      },
    };
  };
