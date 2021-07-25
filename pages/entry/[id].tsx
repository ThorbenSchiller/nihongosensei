import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  findById,
  EntryModel,
  findByIds,
  findMainRefsByTargetId,
  ResolvedEntryRefModel,
} from "../../services/VocabularyService";
import { EntryFull, RelatedEntries, Synonyms } from "../../components/Entry";
import { OtherReadings } from "../../components/Entry/OtherReadings";
import { ContentWrapper } from "../../components/ContentWrapper";
import { SITE_NAME } from "../_app";

type EntryDetailPageProps = {
  entry: EntryModel;
  synonyms: EntryModel[];
  relatedEntries: ResolvedEntryRefModel[];
};

export default function EntryDetailPage({
  entry,
  synonyms,
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
        <Synonyms entries={synonyms} />
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

    // resolve refs

    // resolve relations
    const relationIds = entry.ruigos?.ruigo
      .map((related) => related.id)
      .filter((id) => id !== entry.id);

    const [synonyms = [], relatedEntries = []] = await Promise.all([
      relationIds?.length ? await findByIds(relationIds) : undefined,
      await findMainRefsByTargetId(entry.id),
    ]);

    return {
      props: {
        entry,
        synonyms,
        relatedEntries,
      },
    };
  };
