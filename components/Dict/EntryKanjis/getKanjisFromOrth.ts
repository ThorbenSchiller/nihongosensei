import type { OrthModel } from "@services/VocabularyService";

const KANJI_REGEXP = /[\u4e00-\u9faf]|[\u3400-\u4dbf]/g;

export function getKanjisFromOrth(orth: ReadonlyArray<OrthModel>): Set<string> {
  const kanjis = new Set<string>();

  orth.forEach((orth) => {
    Array.from(orth.value.matchAll(KANJI_REGEXP)).forEach((entry) =>
      kanjis.add(entry[0]),
    );
  });

  return kanjis;
}
