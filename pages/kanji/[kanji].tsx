import type { GetServerSideProps } from "next";
import Head from "next/head";
import { ContentWrapper } from "@components/Dict";
import { addCachingHeader } from "@helper";
import { SITE_NAME } from "@services/constants";
import {
  EntryWrapperModel,
  findByQuery,
  KanjiModel,
} from "@services/VocabularyService";
import { findKanjiByKanji } from "@services/VocabularyService/findKanjiByKanji";
import { KanjiFull } from "@components/Dict/EntryKanjis/KanjiFull";
import { Heading } from "@components/ui";
import { RelatedEntry } from "@components/Dict/Entry/RelatedEntry";

type KanjiDetailPageProps = {
  kanji: KanjiModel;
  entries: EntryWrapperModel[];
};

export default function KanjiDetailPage({
  kanji,
  entries,
}: KanjiDetailPageProps): JSX.Element {
  const title = `${kanji.kanji} - ${SITE_NAME}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentWrapper>
        <KanjiFull kanji={kanji} />
        <div className="mt-4">
          <Heading level={2} className="mb-3">
            Beispiele
          </Heading>
          <ol className="list-decimal list-inside">
            {entries.map(({ entry_json }) => (
              <RelatedEntry key={entry_json.id} entry={entry_json} />
            ))}
          </ol>
        </div>
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  KanjiDetailPageProps
> = async ({ params: { kanji } = {}, res }) => {
  const kanjiString = Array.isArray(kanji) ? kanji[0] : kanji;
  if (!kanjiString) {
    return {
      notFound: true,
    };
  }

  const kanjiModel = await findKanjiByKanji(kanjiString);

  if (!kanjiModel) {
    return {
      notFound: true,
    };
  }

  const entries = await findByQuery(`*${kanjiModel.kanji}*`, {
    limit: 15,
  });

  addCachingHeader(res);

  return {
    props: {
      kanji: kanjiModel,
      entries,
    },
  };
};
