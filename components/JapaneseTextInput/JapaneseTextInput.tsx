import React, { memo, useCallback, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { FuriganaResponse } from "../../pages/api/furigana";
import { FuriganaModel } from "../../services/FuriganaService";
import { Ruby } from "../Ruby";
import { LoadingProgress } from "../ui";
import { TextareaAutosize } from "./TextareaAutosize";

export type JapaneseTextInputProps = {
  onRubyClick: (model: FuriganaModel) => void;
  defaultValue?: string;
  defaultFurigana?: ReadonlyArray<FuriganaModel> | null;
  debounceDelayInMs?: number;
  textSize?: number;
};

function JapaneseTextInput({
  onRubyClick,
  defaultValue,
  defaultFurigana = null,
  debounceDelayInMs = 300,
  textSize = 100,
}: JapaneseTextInputProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [furigana, setFurigana] = useState<ReadonlyArray<FuriganaModel> | null>(
    defaultFurigana
  );
  const [error, setError] = useState<string | null>(null);
  const lastValue = useRef(defaultValue);

  const convertHandler = useDebouncedCallback((value) => {
    setLoading(true);
    fetch("/api/furigana", {
      method: "post",
      body: value,
    })
      .then((response) => response.json())
      .then((furiganaResponse: FuriganaResponse) => {
        setFurigana(furiganaResponse.furigana);
        setError(null);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, debounceDelayInMs);

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);

      const newValue = e.target.value.trim();
      if (lastValue.current === newValue) {
        return;
      }

      lastValue.current = newValue;
      convertHandler(newValue);
    },
    [convertHandler]
  );

  return (
    <div
      className="h-full relative"
      style={{ fontSize: `${textSize}%`, lineHeight: 2 }}
    >
      {loading && <LoadingProgress />}
      {error}
      <TextareaAutosize
        value={value}
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

export default memo(JapaneseTextInput);
