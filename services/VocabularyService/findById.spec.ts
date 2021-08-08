import { findById } from "./findById";
import { EntryWrapperModel } from "./Model";

describe("findById", () => {
  it("should return the first element if the result set", async () => {
    const mockEntryWrapperElement = {
      id: 1,
      entry_json: {},
      lastchange: new Date(),
    } as EntryWrapperModel;
    const executorMock = jest.fn().mockReturnValue([mockEntryWrapperElement]);

    const result = await findById(1, executorMock);

    expect(result).toEqual(mockEntryWrapperElement.entry_json);
    expect(executorMock).toBeCalledTimes(1);
    expect(executorMock).toBeCalledWith(
      `SELECT entry_json FROM entry WHERE id = ?`,
      [1]
    );
  });
});
