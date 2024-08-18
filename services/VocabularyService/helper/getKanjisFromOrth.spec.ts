import { getKanjisFromOrth } from "@components/Dict/EntryKanjis/getKanjisFromOrth";

describe("getKanjisFromOrth", () => {
  it("should return all kanjis correctly", () => {
    const kanjis = getKanjisFromOrth([
      {
        value: "敷島",
        midashigo: true,
      },
      {
        value: "×磯△城島",
        midashigo: true,
      },
      {
        value: "敷島",
      },
      {
        type: "IRREG",
        value: "磯城島",
      },
    ]);
    expect(kanjis.size).toEqual(4);
    expect(kanjis).toContain("敷");
    expect(kanjis).toContain("島");
    expect(kanjis).toContain("磯");
    expect(kanjis).toContain("城");
  });

  it("should return an empty set if no kanjis are given", () => {
    expect(getKanjisFromOrth([]).size).toEqual(0);
  });
});
