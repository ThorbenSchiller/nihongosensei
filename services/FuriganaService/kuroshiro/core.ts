import { IpadicFeatures } from "kuromoji";
import { KuroshioAnalyzer, KuroshiroNotation, StringType } from "./types";
import {
  getStrType,
  isKanji,
  isKatakana,
  patchTokens,
  toRawHiragana,
  toRawKatakana,
} from "./util";

/**
 * Kuroshiro Class
 */
export class Kuroshiro {
  public constructor(private readonly analyzer: KuroshioAnalyzer) {}

  async convert(str: string): Promise<KuroshiroNotation[]> {
    if (!str.trim()) {
      return [];
    }

    const rawTokens = await this.analyzer.parse(str);

    return patchTokens(rawTokens)
      .map((token) => {
        const strType = getStrType(token.surface_form);

        return STR_TYPE_TOKEN_HANDLER_MAP[strType]?.(token) ?? [];
      })
      .flat();
  }
}

type TokenHandler = (token: IpadicFeatures) => KuroshiroNotation[];

const STR_TYPE_TOKEN_HANDLER_MAP: Partial<Record<StringType, TokenHandler>> = {
  kana: handleKana,
  kanji: handleKanji,
  mixed: handleMixed,
  others: handleOther,
};

function handleKanji(token: IpadicFeatures): KuroshiroNotation[] {
  return [
    {
      surfaceForm: token.surface_form,
      type: "kanji",
      reading: token.reading ? toRawHiragana(token.reading) : undefined,
      pronunciation: token.pronunciation ?? token.reading,
      token,
    },
  ];
}

function handleMixed(token: IpadicFeatures): KuroshiroNotation[] {
  const notations: KuroshiroNotation[] = [];
  let pattern = "";
  let isLastTokenKanji = false;
  const subs = []; // recognize kanjis and group them
  for (let c = 0; c < token.surface_form.length; c++) {
    if (isKanji(token.surface_form[c])) {
      if (!isLastTokenKanji) {
        // ignore successive kanji tokens (#10)
        isLastTokenKanji = true;
        pattern += "(.+)";
        subs.push(token.surface_form[c]);
      } else {
        subs[subs.length - 1] += token.surface_form[c];
      }
    } else {
      isLastTokenKanji = false;
      subs.push(token.surface_form[c]);
      pattern += isKatakana(token.surface_form[c])
        ? toRawHiragana(token.surface_form[c])
        : token.surface_form[c];
    }
  }
  const reg = new RegExp(`^${pattern}$`);
  if (!token.reading) {
    return notations;
  }
  const matches = reg.exec(toRawHiragana(token.reading));
  if (matches) {
    let pickKanji = 1;
    for (let c1 = 0; c1 < subs.length; c1++) {
      if (isKanji(subs[c1][0])) {
        notations.push({
          surfaceForm: subs[c1],
          type: "kanji",
          reading: matches[pickKanji],
          pronunciation: toRawKatakana(matches[pickKanji]),
          token,
        });
        pickKanji += 1;
      } else {
        notations.push({
          surfaceForm: subs[c1],
          type: "mixed",
          reading: toRawHiragana(subs[c1]),
          pronunciation: toRawKatakana(subs[c1]),
          token,
        });
      }
    }
  } else {
    notations.push({
      surfaceForm: token.surface_form,
      type: "kanji",
      reading: token.reading ? toRawHiragana(token.reading) : token.reading,
      pronunciation: token.pronunciation || token.reading,
      token,
    });
  }

  return notations;
}

function handleKana(token: IpadicFeatures): KuroshiroNotation[] {
  return Array.from(token.surface_form).map((char, index) => ({
    surfaceForm: char,
    type: "mixed",
    pronunciation:
      (token.pronunciation && token.pronunciation[index]) ||
      token.reading?.[index],
    token,
  }));
}

function handleOther(token: IpadicFeatures): KuroshiroNotation[] {
  return Array.from(token.surface_form).map((char) => ({
    surfaceForm: char,
    type: "others",
    reading: char,
    pronunciation: char,
    token,
  }));
}
