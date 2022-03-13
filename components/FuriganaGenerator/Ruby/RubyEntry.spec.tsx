import type { FuriganaModel } from "@services/FuriganaService";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RubyEntry } from "./RubyEntry";

describe("RubyEntry", () => {
  it("should call the onClick method with the correct furigana model", () => {
    const furigana: FuriganaModel = {
      text: "日本語",
      reading: "にほん",
    };
    const handleClickMock = jest.fn();

    render(<RubyEntry onClick={handleClickMock} {...furigana} />);

    const furiganaElement = screen.getByTestId("furigana");

    fireEvent.click(furiganaElement);

    expect(handleClickMock).toBeCalledTimes(1);
    expect(handleClickMock).toBeCalledWith(furigana);
  });

  it("should render `invisible` if no reading is given", () => {
    const furigana: FuriganaModel = {
      text: "日本語",
    };

    render(<RubyEntry {...furigana} />);

    expect(screen.getByTestId("ruby-invisible")).not.toBeNull();
  });
});
