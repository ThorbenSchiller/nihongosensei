import { parsePaginationParams } from "./parsePaginationParams";

describe("parsePaginationParams", () => {
  it("should parse correctly if limit and offset are present", () => {
    const params = {
      offset: "10",
      limit: "5",
    };
    const paginationParams = parsePaginationParams(params);

    expect(paginationParams.limit).toEqual(5);
    expect(paginationParams.offset).toEqual(10);
  });

  it("should parse correctly if limit is an array", () => {
    const params = {
      limit: ["5"],
    };
    const paginationParams = parsePaginationParams(params);

    expect(paginationParams.limit).toEqual(5);
    expect(paginationParams.offset).toBeUndefined();
  });

  it("should parse correctly if limit is not a number", () => {
    const params = {
      limit: "foo",
    };
    const paginationParams = parsePaginationParams(params);

    expect(paginationParams.limit).toBeUndefined();
    expect(paginationParams.offset).toBeUndefined();
  });

  it("should parse correctly if only limit is present", () => {
    const params = {
      limit: "5",
    };
    const paginationParams = parsePaginationParams(params);

    expect(paginationParams.limit).toEqual(5);
    expect(paginationParams.offset).toBeUndefined();
  });
});
