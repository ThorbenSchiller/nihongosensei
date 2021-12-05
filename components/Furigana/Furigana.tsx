import React, { memo, useCallback } from "react";
import type { FuriganaModel } from "../../services/FuriganaService";

export type FuriganaProps = {
  onClick?: (model: FuriganaModel) => void;
} & FuriganaModel;

function Furigana({ onClick, ...furiganaModel }: FuriganaProps) {
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
        the textarea has not line whereas a single span performs a line break.
       */}
      <span className="relative" lang="ja">
        <span className="opacity-0">{text}</span>
        <span
          className="absolute top-[-65%] left-1/2 whitespace-nowrap text-center block select-none text-[50%]"
          style={{ transform: "translate(-50%, 0)" }}
          lang="ja"
        >
          {reading}
        </span>
      </span>
    </span>
  ) : (
    <>{text}</>
  );
}

export default memo(Furigana);
