import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Furigana } from "./Furigana";

describe("Furigana", () => {
  it("should contain the reading and original text", () => {
    const reading = "にほん";
    const text = "日本語";

    render(<Furigana reading={reading} text={text} />);

    expect(screen.getByTestId("furigana-reading")).toHaveTextContent(reading);
    expect(screen.getByTestId("furigana-text")).toHaveTextContent(text);
  });
});
