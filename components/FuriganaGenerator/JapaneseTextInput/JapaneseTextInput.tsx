import React, { useCallback } from "react";
import { FuriganaModel } from "../../../services/FuriganaService";
import { Ruby } from "../Ruby";
import { TextareaAutosize } from "./TextareaAutosize";

export type JapaneseTextInputProps = {
  onRubyClick: (model: FuriganaModel) => void;
  value?: string | null;
  furigana?: ReadonlyArray<FuriganaModel> | null;
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
    [onChange]
  );

  return (
    <div
      className="h-full relative"
      style={{ fontSize: `${textSize}%`, lineHeight: 2 }}
    >
      <TextareaAutosize
        value={value ?? ""}
        onChange={changeHandler}
        className="min-h-full w-full outline-none bg-transparent resize-none overflow-hidden"
        placeholder="Type in some Japanese text..."
        lang="ja"
        autoFocus={true}
      />
      {furigana && (
        <Ruby
          furigana={furigana}
          className="absolute whitespace-pre-wrap inset-0 pointer-events-none"
          onClick={onRubyClick}
        />
      )}
    </div>
  );
}
