import { getRandomEntry } from "./getRandomEntry";

describe("getRandomEntry", () => {
  it("should return a random entry", () => {
    const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const random = getRandomEntry(entries);

    expect(random).toBeDefined();
    expect(entries.includes(random)).toEqual(true);
  });
});
