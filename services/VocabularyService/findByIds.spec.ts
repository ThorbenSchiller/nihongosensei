import { findByIds } from "./findByIds";
import { EntryModel } from "./Model";

describe("findByIds", () => {
  it("should create the query correctly with multiple ids", async () => {
    const mockedResult: EntryModel[] = [];
    const executorMock = jest.fn().mockReturnValue(mockedResult);

    const result = await findByIds([1, 2, 3], executorMock);

    expect(result).toEqual(mockedResult);
    expect(executorMock).toBeCalledTimes(1);
    expect(executorMock).toBeCalledWith(
      `SELECT * FROM entry WHERE id IN (?,?,?)`,
      [1, 2, 3],
    );
  });
});
