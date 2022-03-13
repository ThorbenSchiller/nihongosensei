import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { JapaneseTextControls } from "./JapaneseTextControls";

describe("JapaneseTextContainer", () => {
  it("should call the onTextSizeChange callback upon increase correctly", () => {
    const handleTextSizeChangeMock = jest.fn();
    const textSize = 100;
    const minTextSize = 80;
    const maxTextSize = 120;
    const textSizeStep = 10;

    render(
      <JapaneseTextControls
        textSize={textSize}
        maxTextSize={maxTextSize}
        minTextSize={minTextSize}
        textSizeStep={textSizeStep}
        onTextSizeChange={handleTextSizeChangeMock}
      />
    );

    fireEvent.click(screen.getByTestId("text-controls-increase-text-size"));

    expect(handleTextSizeChangeMock).toBeCalledTimes(1);
    expect(handleTextSizeChangeMock).toBeCalledWith(textSize + textSizeStep);
  });

  it("should call the onTextSizeChange callback upon decrease correctly", () => {
    const handleTextSizeChangeMock = jest.fn();
    const textSize = 100;
    const minTextSize = 80;
    const maxTextSize = 120;
    const textSizeStep = 10;

    render(
      <JapaneseTextControls
        textSize={textSize}
        maxTextSize={maxTextSize}
        minTextSize={minTextSize}
        textSizeStep={textSizeStep}
        onTextSizeChange={handleTextSizeChangeMock}
      />
    );

    fireEvent.click(screen.getByTestId("text-controls-decrease-text-size"));

    expect(handleTextSizeChangeMock).toBeCalledTimes(1);
    expect(handleTextSizeChangeMock).toBeCalledWith(textSize - textSizeStep);
  });

  it("should disable the in- and decrease button if the min and max size is reached", () => {
    const handleTextSizeChangeMock = jest.fn();
    const textSize = 100;
    const minTextSize = 100;
    const maxTextSize = 100;
    const textSizeStep = 10;

    render(
      <JapaneseTextControls
        textSize={textSize}
        maxTextSize={maxTextSize}
        minTextSize={minTextSize}
        textSizeStep={textSizeStep}
        onTextSizeChange={handleTextSizeChangeMock}
      />
    );

    expect(
      screen.getByTestId("text-controls-increase-text-size")
    ).toBeDisabled();
    expect(
      screen.getByTestId("text-controls-decrease-text-size")
    ).toBeDisabled();
  });
});
