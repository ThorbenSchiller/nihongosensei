import type { KanjiModel } from "@services/VocabularyService/Model/KanjiModel";
import clsx from "clsx";
import { MinorText } from "@components/ui";

type KanjiFullProps = {
  kanji: KanjiModel;
  className?: string;
};

export function KanjiFull({ kanji, className }: KanjiFullProps) {
  return (
    <div className={clsx(className, "font-serif")}>
      <h1 className="text-5xl mb-2" lang="ja">
        {kanji.kanji}
      </h1>
      <MinorText className="mb-2" component="p">
        {kanji.strokes ?? "?"} Striche, Jōyō-Grad {kanji.grade}
      </MinorText>
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
