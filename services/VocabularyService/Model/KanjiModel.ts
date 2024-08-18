export type KanjiModel = {
  kanji: string;
  strokes?: number;
  grade?: number;
  /**
   * In katakana.
   */
  onyomi?: string;
  /**
   * In hiragana.
   */
  kunyomi?: string;
  radical?: string;
};
