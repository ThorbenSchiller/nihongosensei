import { IpadicFeatures } from "kuromoji";
import { StringType } from "./types";

export const KATAKANA_HIRAGANA_SHIFT =
  "\u3041".charCodeAt(0) - "\u30a1".charCodeAt(0);
export const HIRAGANA_KATAKANA_SHIFT =
  "\u30a1".charCodeAt(0) - "\u3041".charCodeAt(0);

/**
 * Check if given char is a hiragana
 *
 * @param ch Given char
 * @return {boolean} if given char is a hiragana
 */
export const isHiragana = function (ch: string): boolean {
  ch = ch[0];
  return ch >= "\u3040" && ch <= "\u309f";
};

/**
 * Check if given char is a katakana
 *
 * @param ch Given char
 * @return {boolean} if given char is a katakana
 */
export const isKatakana = function (ch: string): boolean {
  ch = ch[0];
  return ch >= "\u30a0" && ch <= "\u30ff";
};

/**
 * Check if given char is a kana
 *
 * @param ch Given char
 * @return {boolean} if given char is a kana
 */
export const isKana = function (ch: string): boolean {
  return isHiragana(ch) || isKatakana(ch);
};

/**
 * Check if given char is a kanji
 *
 * @param ch Given char
 * @return {boolean} if given char is a kanji
 */
export const isKanji = function (ch: string): boolean {
  ch = ch[0];
  return (
    (ch >= "\u4e00" && ch <= "\u9fcf") ||
    (ch >= "\uf900" && ch <= "\ufaff") ||
    (ch >= "\u3400" && ch <= "\u4dbf")
  );
};

/**
 * Check if given char is a Japanese
 *
 * @param ch Given char
 * @return {boolean} if given char is a Japanese
 */
export const isJapanese = function (ch: string): boolean {
  return isKana(ch) || isKanji(ch);
};

/**
 * Check if given string has hiragana
 *
 * @param str Given string
 * @return {boolean} if given string has hiragana
 */
export const hasHiragana = function (str: string): boolean {
  return Array.from(str).some(isHiragana);
};

/**
 * Check if given string has Japanese
 *
 * @param str Given string
 * @return {boolean} if given string has Japanese
 */
export const hasJapanese = function (str: string): boolean {
  return Array.from(str).some(isJapanese);
};

/**
 * Convert kana to hiragana
 *
 * @param str Given string
 * @return Hiragana string
 */
export const toRawHiragana = function (str: string): string {
  return Array.from(str)
    .map((ch) => {
      if (ch > "\u30a0" && ch < "\u30f7") {
        return String.fromCharCode(ch.charCodeAt(0) + KATAKANA_HIRAGANA_SHIFT);
      }
      return ch;
    })
    .join("");
};

/**
 * Convert kana to katakana
 *
 * @param str Given string
 * @return Katakana string
 */
export const toRawKatakana = function (str: string): string {
  return Array.from(str)
    .map((ch) => {
      if (ch > "\u3040" && ch < "\u3097") {
        return String.fromCharCode(ch.charCodeAt(0) + HIRAGANA_KATAKANA_SHIFT);
      }
      return ch;
    })
    .join("");
};

/**
 * Get the type of given string
 *
 * @param str Given string
 * @return Type number. 0 for pure kanji, 1 for kanji-kana-mixed, 2 for pure kana, 3 for others
 */
export const getStrType = function (str: string): StringType {
  let hasKJ = false;
  let hasHK = false;
  for (let i = 0; i < str.length; i++) {
    if (isKanji(str[i])) {
      hasKJ = true;
    } else if (isHiragana(str[i]) || isKatakana(str[i])) {
      hasHK = true;
    }
  }
  if (hasKJ && hasHK) {
    return "mixed";
  }
  if (hasKJ) {
    return "kanji";
  }
  if (hasHK) {
    return "kana";
  }

  return "others";
};

/**
 * Patch tokens for conversion.
 *
 * @param inputTokens Given tokens
 */
export const patchTokens = function (
  inputTokens: ReadonlyArray<IpadicFeatures>,
): IpadicFeatures[] {
  const tokens = [...inputTokens];
  // patch for token structure
  for (let cr = 0; cr < tokens.length; cr++) {
    const token = tokens[cr];
    if (hasJapanese(token.surface_form)) {
      if (!token.reading) {
        if (token.surface_form.split("").every(isKana)) {
          token.reading = toRawKatakana(token.surface_form);
        } else {
          token.reading = token.surface_form;
        }
      } else if (hasHiragana(token.reading)) {
        token.reading = toRawKatakana(token.reading);
      }
    } else {
      token.reading = token.surface_form;
    }
  }

  // patch for 助動詞"う" after 動詞
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (
      token.pos &&
      token.pos === "助動詞" &&
      (token.surface_form === "う" || token.surface_form === "ウ")
    ) {
      const previousToken = tokens[i - 1];
      if (i - 1 >= 0 && previousToken.pos && previousToken.pos === "動詞") {
        previousToken.surface_form += "う";
        if (previousToken.pronunciation) {
          previousToken.pronunciation += "ー";
        } else {
          previousToken.pronunciation = `${previousToken.reading}ー`;
        }
        previousToken.reading += "ウ";
        tokens.splice(i, 1);
        i--;
      }
    }
  }

  // patch for "っ" at the tail of 動詞、形容詞
  for (let j = 0; j < tokens.length; j++) {
    const token = tokens[j];
    if (
      token.pos &&
      (token.pos === "動詞" || token.pos === "形容詞") &&
      token.surface_form.length > 1 &&
      (token.surface_form[token.surface_form.length - 1] === "っ" ||
        token.surface_form[token.surface_form.length - 1] === "ッ")
    ) {
      if (j + 1 < tokens.length) {
        const nextToken = tokens[j + 1];
        token.surface_form += nextToken.surface_form;
        if (token.pronunciation) {
          token.pronunciation += nextToken.pronunciation;
        } else {
          token.pronunciation = `${token.reading}${nextToken.reading}`;
        }
        token.reading ??= "";
        token.reading += nextToken.reading;
        tokens.splice(j + 1, 1);
        j--;
      }
    }
  }

  return tokens;
};
