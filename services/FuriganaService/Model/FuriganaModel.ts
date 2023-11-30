/**
 * Represents a Furigana annotation.
 */
export type FuriganaModel = {
  /**
   * The actual text.
   *
   * @example 取次
   */
  text: string;
  /**
   * The reading for the text.
   *
   * @example とりつ
   */
  reading: string | null;
  /**
   * The infinite form (only set for verbs).
   *
   * @example 食べる
   */
  basicForm?: string | null;
};
