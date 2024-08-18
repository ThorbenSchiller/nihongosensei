import clsx from "clsx";
import type { KanjiModel } from "@services/VocabularyService/Model/KanjiModel";
import { Link } from "@components/ui";

type EntryKanjiProps = {
  kanji: KanjiModel;
  className?: string;
};

export function EntryKanji({ kanji, className }: EntryKanjiProps) {
  return (
    <div className={clsx(className, "flex items-center gap-4 font-serif")}>
      <Link
        color="plain"
        href={`/kanji/${kanji.kanji}`}
        className="text-4xl"
        lang="ja"
      >
        {kanji.kanji}
      </Link>
      <div>
        <p>
          On: <span lang="ja">{kanji.onyomi ?? "-"}</span>
        </p>
        <p>
          Kun: <span lang="ja">{kanji.kunyomi ?? "-"}</span>
        </p>
      </div>
    </div>
  );
}
