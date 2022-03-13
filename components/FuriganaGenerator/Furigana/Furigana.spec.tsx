import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Furigana } from "./Furigana";

describe("Furigana", () => {
  it("should contain the reading and original text", () => {
    const reading = "にほん";
    const text = "日本語";

    render(<Furigana reading={reading} text={text} />);

    expect(screen.getByTestId("furigana-reading")).toHaveTextContent(reading);
    expect(screen.getByTestId("furigana-text")).toHaveTextContent(text);
  });

  it("should only return a text if no reading is given", () => {
    const text = "日本語";

    render(<Furigana text={text} />);

    expect(screen.queryByTestId("furigana-reading")).toBeNull();
  });
});
