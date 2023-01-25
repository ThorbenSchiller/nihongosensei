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
  ResolvedEntryRefModel,
} from "@services/VocabularyService";
import { GetServerSideProps } from "next";
import Head from "next/head";

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
          className="font-serif text-lg"
          entries={synonyms.map((entry) => entry.entry_json)}
        />
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
