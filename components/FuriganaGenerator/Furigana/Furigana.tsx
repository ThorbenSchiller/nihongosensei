import type { FuriganaModel } from "@services/FuriganaService";
import clsx from "clsx";
import { useCallback } from "react";

export type FuriganaProps = {
  onClick?: (model: FuriganaModel) => void;
} & FuriganaModel;

export function Furigana({ onClick, ...furiganaModel }: FuriganaProps) {
  const clickHandler = useCallback(() => {
    onClick?.(furiganaModel);
  }, [onClick, furiganaModel]);
  const { reading, text } = furiganaModel;

  return (
    <span
      className={clsx(
        "text-black dark:text-white relative",
        onClick && "cursor-pointer pointer-events-auto",
      )}
      onClick={clickHandler}
      data-testid="furigana"
    >
      <span className="opacity-0" data-testid="furigana-text">
        {text}
      </span>
      <span
        className="absolute top-[-65%] left-1/2 whitespace-nowrap text-center block select-none text-[50%]"
        style={{ transform: "translate(-50%, 0)" }}
        data-testid="furigana-reading"
      >
        {reading}
      </span>
    </span>
  );
}
