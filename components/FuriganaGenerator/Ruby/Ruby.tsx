import { RubyEntry } from "@components/FuriganaGenerator/Ruby/RubyEntry";
import type { FuriganaModel } from "@services/FuriganaService";
import React, { HTMLProps } from "react";

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

export function Ruby({ furigana, onClick, ...rest }: RubyProps): JSX.Element {
  return (
    <span {...rest} data-testid="ruby">
      {furigana.map((furiganaEntry, index) => (
        <RubyEntry
          key={`ruby-${furiganaEntry.text}-${index}`}
          onClick={onClick}
          {...furiganaEntry}
        />
      ))}
    </span>
  );
}
