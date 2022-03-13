import type { FuriganaModel } from "@services/FuriganaService";
import React, { useCallback } from "react";

export type FuriganaProps = {
  onClick?: (model: FuriganaModel) => void;
} & FuriganaModel;

export function Furigana({ onClick, ...furiganaModel }: FuriganaProps) {
  const clickHandler = useCallback(() => {
    onClick?.(furiganaModel);
  }, [onClick, furiganaModel]);
  const { reading, text } = furiganaModel;

  return reading ? (
    <span
      className={onClick ? "cursor-pointer pointer-events-auto" : undefined}
      onClick={clickHandler}
    >
      {/*
        this span seems to be required if the kanji is at the box.
        the textarea has no line whereas a single span performs a line break.
       */}
      <span className="relative" lang="ja" data-testid="furigana">
        <span className="opacity-0" data-testid="furigana-text">
          {text}
        </span>
        <span
          className="absolute top-[-65%] left-1/2 whitespace-nowrap text-center block select-none text-[50%]"
          style={{ transform: "translate(-50%, 0)" }}
          lang="ja"
          data-testid="furigana-reading"
        >
          {reading}
        </span>
      </span>
    </span>
  ) : (
    <>{text}</>
  );
}
