import { transformOptionsToQuery } from "./transformOptionsToQuery";

describe("transformOptionsToQuery", () => {
  it("should transform the jlpt option correctly", () => {
    const { where, binds } = transformOptionsToQuery({
      jlpt: 1,
    });

    expect(where).toEqual(`jlpt = ?`);
    expect(binds).toEqual([1]);
  });
  it("should transform the ids option correctly", () => {
    const { where, binds } = transformOptionsToQuery({
      ids: [1, 2, 3],
    });

    expect(where).toEqual(`id IN (?,?,?)`);
    expect(binds).toEqual([1, 2, 3]);
  });
});
