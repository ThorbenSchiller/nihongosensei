import { KanjiModel } from "@services/VocabularyService/Model/KanjiModel";
import { EntryKanji } from "./EntryKanji";
import { Heading } from "@components/ui";

type EntryKanjisProps = {
  kanjis: ReadonlyArray<KanjiModel>;
  className?: string;
};

export function EntryKanjis({ kanjis, className }: EntryKanjisProps) {
  if (!kanjis.length) {
    return null;
  }

  return (
    <div className={className}>
      <Heading level={2} className="mb-3">
        Kanjis
      </Heading>
      <div className="flex flex-col flex-wrap gap-2">
        {kanjis.map((kanji) => (
          <EntryKanji key={kanji.kanji} kanji={kanji} />
        ))}
      </div>
    </div>
  );
}
