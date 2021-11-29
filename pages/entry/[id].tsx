import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { ContentWrapper } from "../../components/ContentWrapper";
import { EntryFull, RelatedEntries, Synonyms } from "../../components/Entry";
import { JlptBadge } from "../../components/Entry/JlptBadge";
import { OtherReadings } from "../../components/Entry/OtherReadings";
import { addCachingHeader } from "../../helper/addCachingHeader";
import {
  EntryWrapperModel,
  findById,
  findByIds,
  findMainRefsByTargetId,
  ResolvedEntryRefModel,
} from "../../services/VocabularyService";
import { SITE_NAME } from "../_app";

type EntryDetailPageProps = {
  entry: EntryWrapperModel;
  synonyms: EntryWrapperModel[];
  relatedEntries: ResolvedEntryRefModel[];
};

export default function EntryDetailPage({
  entry: { entry_json, jlpt },
  synonyms,
  relatedEntries,
}: EntryDetailPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          {entry_json.form.orth[0]?.value} - {SITE_NAME}
        </title>
      </Head>
      <ContentWrapper>
        <EntryFull entry={entry_json} />
        <OtherReadings orth={entry_json.form.orth} />
        {jlpt && (
          <div className="mt-2 font-sans">
            <JlptBadge level={jlpt} />
          </div>
        )}
        <Synonyms entries={synonyms.map((entry) => entry.entry_json)} />
        <RelatedEntries entries={relatedEntries} />
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  EntryDetailPageProps
> = async ({ params: { id } = {}, res }) => {
  const idNumber = Number(Array.isArray(id) ? id[0] : id);

  const entry = await findById(idNumber);

  if (!entry) {
    return {
      notFound: true,
    };
  }

  // resolve refs

  // resolve relations
  const relationIds = entry.entry_json.ruigos?.ruigo
    .map((related) => related.id)
    .filter((id) => id !== entry.id);

  const [synonyms = [], relatedEntries = []] = await Promise.all([
    relationIds?.length ? await findByIds(relationIds) : undefined,
    await findMainRefsByTargetId(entry.id),
  ]);

  addCachingHeader(res);

  return {
    props: {
      entry,
      synonyms,
      relatedEntries,
    },
  };
};
