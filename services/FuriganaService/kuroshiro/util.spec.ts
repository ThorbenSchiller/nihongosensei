import {
  isHiragana,
  isJapanese,
  isKana,
  isKanji,
  isKatakana,
  toRawHiragana,
  toRawKatakana,
} from "./util";

describe("Kuroshiro Utils", () => {
  test.each([
    ["コ", true],
    ["こ", false],
    ["公", false],
  ])("isKatakana: should recognize %s correctly", (character, expected) => {
    const result = isKatakana(character);

    expect(result).toEqual(expected);
  });

  test.each([
    ["コ", false],
    ["こ", true],
    ["公", false],
  ])("isHiragana: should recognize %s correctly", (character, expected) => {
    const result = isHiragana(character);

    expect(result).toEqual(expected);
  });

  test.each([
    ["コ", true],
    ["こ", true],
    ["公", false],
  ])("isKana: should recognize %s correctly", (character, expected) => {
    const result = isKana(character);

    expect(result).toEqual(expected);
  });

  test.each([
    ["コ", false],
    ["こ", false],
    ["公", true],
  ])("isKanji: should recognize %s correctly", (character, expected) => {
    const result = isKanji(character);

    expect(result).toEqual(expected);
  });

  test.each([
    ["コ", true],
    ["こ", true],
    ["公", true],
    ["f", false],
    ["1", false],
  ])("isJapanese: should recognize %s correctly", (character, expected) => {
    const result = isJapanese(character);

    expect(result).toEqual(expected);
  });

  it("should convert correctly to hiragana", () => {
    const text = "ドイツ";
    const converted = toRawHiragana(text);

    expect(converted).toEqual("どいつ");
  });

  it("should convert correctly to katakana", () => {
    const text = "どいつ";
    const converted = toRawKatakana(text);

    expect(converted).toEqual("ドイツ");
  });
});
