import {
  ContentWrapper,
  EntryFull,
  JlptBadge,
  RelatedEntries,
  Synonyms,
} from "@components/Dict";
import { addCachingHeader } from "@helper";
import { SITE_NAME } from "@services/constants";
import {
  EntryWrapperModel,
  findById,
  findByIds,
  findMainRefsByTargetId,
  KanjiModel,
  ResolvedEntryRefModel,
} from "@services/VocabularyService";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { EntryKanjis } from "@components/Dict/EntryKanjis/EntryKanjis";
import { getKanjisFromOrth } from "@services/VocabularyService/helper/getKanjisFromOrth";
import { findKanjis } from "@services/VocabularyService/findKanjis";

type EntryDetailPageProps = {
  entry: EntryWrapperModel;
  synonyms: EntryWrapperModel[];
  relatedEntries: ResolvedEntryRefModel[];
  kanjis: KanjiModel[];
};

export default function EntryDetailPage({
  entry: { entry_json, jlpt },
  synonyms,
  relatedEntries,
  kanjis,
}: EntryDetailPageProps): JSX.Element {
  const title = `${entry_json.form.orth[0]?.value} - ${SITE_NAME}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentWrapper>
        <EntryFull entry={entry_json} />
        {jlpt && (
          <div className="my-2">
            <JlptBadge level={jlpt} />
          </div>
        )}
        <Synonyms
          className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-700"
          entries={synonyms.map((entry) => entry.entry_json)}
        />
        <EntryKanjis
          className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700"
          kanjis={kanjis}
        />
        <RelatedEntries
          className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-700"
          entries={relatedEntries}
        />
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

  // resolve kanjis

  const kanjiSet = getKanjisFromOrth(entry.entry_json.form.orth);

  const [synonyms = [], relatedEntries = [], kanjis = []] = await Promise.all([
    relationIds?.length ? await findByIds(relationIds) : undefined,
    await findMainRefsByTargetId(entry.id),
    kanjiSet.size ? findKanjis(Array.from(kanjiSet)) : undefined,
  ]);

  addCachingHeader(res);

  return {
    props: {
      entry,
      synonyms,
      relatedEntries,
      kanjis,
    },
  };
};
