import type { FuriganaModel } from "@services/FuriganaService";
import React, { HTMLProps, memo } from "react";
import { Invisible } from "../../ui";
import { Furigana } from "../Furigana";

export type RubyProps = {
  /**
   * A html string which (may) contain <ruby> elements.
   * The string will be parsed and converted to own elements.
   */
  furigana: ReadonlyArray<FuriganaModel>;
  /**
   * Callback executed if a furigana element has been click. The argument contains the text (kanji).
   *
   * @param text The Japanese text which was clicked.
   */
  onClick?: (model: FuriganaModel) => void;
} & Omit<HTMLProps<HTMLSpanElement>, "onClick">;

function Ruby({ furigana, onClick, ...rest }: RubyProps): JSX.Element {
  return (
    <span {...rest}>
      {furigana.map((furiganaEntry, index) => {
        return furiganaEntry.reading ? (
          <Furigana
            key={`ruby-${index}`}
            onClick={onClick}
            {...furiganaEntry}
          />
        ) : (
          <Invisible key={`invisible-${index}`} lang="ja">
            {furiganaEntry.text}
          </Invisible>
        );
      })}
    </span>
  );
}

export default memo(Ruby);
