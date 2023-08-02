import { setKeyProperty } from "./setKeyProperty";

describe("setKeyProperty", () => {
  it("should set the key correctly on the given element", () => {
    const element = <div />;
    const index = 8;
    const keyRetriever = jest.fn();
    keyRetriever.mockImplementation((index: number) => index.toString());
    const setKeyFunction = setKeyProperty(keyRetriever);

    const elementWithKey = setKeyFunction(element, index);

    expect(elementWithKey.key).toEqual(index.toString());
    expect(keyRetriever).toBeCalledTimes(1);
    expect(keyRetriever).toBeCalledWith(index);
  });
});
