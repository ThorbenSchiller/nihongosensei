import MinusIcon from "@heroicons/react/solid/MinusIcon";
import PlusIcon from "@heroicons/react/solid/PlusIcon";
import React from "react";

export type JapaneseTextControlsProps = {
  textSize?: number;
  minTextSize?: number;
  maxTextSize?: number;
  textSizeStep?: number;
  onTextSizeChange?: (textSize: number) => void;
};

export function JapaneseTextControls({
  textSize = 100,
  minTextSize = 70,
  maxTextSize = 150,
  textSizeStep = 10,
  onTextSizeChange,
}: JapaneseTextControlsProps): JSX.Element {
  const decreaseTextSizeHandler = () =>
    onTextSizeChange?.(textSize - textSizeStep);
  const increaseTextSizeHandler = () =>
    onTextSizeChange?.(textSize + textSizeStep);

  return (
    <div
      className="sticky border-b border-gray-300 dark:border-gray-700 p-3"
      data-testid="text-controls"
    >
      <div className="border border-gray-300 dark:border-gray-700 rounded inline-block">
        <button
          onClick={decreaseTextSizeHandler}
          disabled={textSize - textSizeStep < minTextSize}
          className="py-2 px-3"
          aria-label="Decrease Font Size"
          data-testid="text-controls-decrease-text-size"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <button disabled={true}>{textSize}%</button>
        <button
          onClick={increaseTextSizeHandler}
          disabled={textSize + textSizeStep > maxTextSize}
          className="py-2 px-3"
          aria-label="Increase Font Size"
          data-testid="text-controls-increase-text-size"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
