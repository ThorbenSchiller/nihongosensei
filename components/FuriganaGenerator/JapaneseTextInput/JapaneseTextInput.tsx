import { FuriganaModel } from "@services/FuriganaService";
import React, { useCallback } from "react";
import { Ruby } from "../Ruby";

export type JapaneseTextInputProps = {
  onRubyClick: (model: FuriganaModel) => void;
  value?: string | null;
  furigana?: ReadonlyArray<FuriganaModel | string> | null;
  onChange?: (value: string) => void;
  textSize?: number;
};

export function JapaneseTextInput({
  onRubyClick,
  value,
  furigana,
  onChange,
  textSize = 100,
}: JapaneseTextInputProps): JSX.Element {
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value),
    [onChange],
  );

  return (
    <div
      className="relative min-h-full"
      style={{ fontSize: `${textSize}%`, lineHeight: 2 }}
    >
      <textarea
        value={value ?? ""}
        onChange={changeHandler}
        className="outline-none bg-transparent resize-none overflow-hidden absolute inset-0"
        placeholder="Type in some Japanese text..."
        lang="ja"
        autoFocus={true}
      />
      {furigana && (
        <Ruby
          furigana={furigana}
          className="min-h-full w-full whitespace-pre-wrap inset-0 pointer-events-none"
          onClick={onRubyClick}
        />
      )}
    </div>
  );
}
