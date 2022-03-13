import { Invisible } from "@components/ui";
import type { FuriganaModel } from "@services/FuriganaService";
import React from "react";
import { Furigana } from "../Furigana";

export type RubyEntryProps = FuriganaModel & {
  onClick?: (model: FuriganaModel) => void;
};

export function RubyEntry({
  onClick,
  ...furigana
}: RubyEntryProps): JSX.Element {
  return furigana.reading ? (
    <Furigana onClick={onClick} {...furigana} />
  ) : (
    <Invisible data-testid="ruby-invisible" lang="ja">
      {furigana.text}
    </Invisible>
  );
}
