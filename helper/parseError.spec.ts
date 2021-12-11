import { parseError } from "./parseError";

describe("parseError", () => {
  it("should return the message of an Error", () => {
    const message = "foo";
    const error = new Error(message);
    const parsed = parseError(error);

    expect(parsed).toEqual(message);
  });

  it("should return the default message of an empty Error", () => {
    const message = "foo";
    const error = new Error();
    const parsed = parseError(error, message);

    expect(parsed).toEqual(message);
  });

  it("should return the message of a string", () => {
    const message = "foo";
    const parsed = parseError(message);

    expect(parsed).toEqual(message);
  });

  it("should return the default message if not an error or string", () => {
    const message = "foo";
    const parsed = parseError(null, message);

    expect(parsed).toEqual(message);
  });
});
