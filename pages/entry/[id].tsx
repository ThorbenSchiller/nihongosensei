import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  findById,
  EntryModel,
  findByIds,
} from "../../services/VocabularyService";
import { EntryFull, RelatedEntries } from "../../components/Entry";
import { OtherReadings } from "../../components/Entry/OtherReadings";
import { ContentWrapper } from "../../components/ContentWrapper";
import { SITE_NAME } from "../_app";

type EntryDetailPageProps = {
  entry: EntryModel;
  relatedEntries: EntryModel[];
};

export default function EntryDetailPage({
  entry,
  relatedEntries,
}: EntryDetailPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          {entry.form.orth[0]?.value} - {SITE_NAME}
        </title>
      </Head>
      <ContentWrapper>
        <EntryFull entry={entry} />
        <OtherReadings orth={entry.form.orth} />
        <RelatedEntries entries={relatedEntries} />
      </ContentWrapper>
    </>
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
