import { useTextSize } from "@components/hooks";
import { Alert, LoadingProgress } from "@components/ui";
import { parseError } from "@helper";
import type { FuriganaModel } from "@services/FuriganaService";
import { memo, useCallback, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { FuriganaResponse } from "../../../pages/api/furigana";
import { JapaneseTextControls } from "./JapaneseTextControls";
import { JapaneseTextInput, JapaneseTextInputProps } from "./JapaneseTextInput";

type JapaneseTextContainerProps = {
  defaultError: string | null;
  onRubyClick: (model: FuriganaModel) => void;
  defaultValue: string | null;
  defaultFurigana: ReadonlyArray<FuriganaModel | string> | null;
  debounceDelayInMs?: number;
};

async function fetchFurigana(text: string): Promise<FuriganaResponse> {
  const response = await fetch("/api/furigana", {
    method: "post",
    body: text,
  });
  if (!response.ok) {
    throw new Error();
  }

  return response.json() as Promise<FuriganaResponse>;
}

export const JapaneseTextContainer = memo(function JapaneseTextContainer({
  onRubyClick,
  debounceDelayInMs = 300,
  defaultFurigana,
  defaultValue,
  defaultError,
}: JapaneseTextContainerProps): JSX.Element {
  const [textSize, setTextSize] = useTextSize();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [furigana, setFurigana] = useState<ReadonlyArray<
    FuriganaModel | string
  > | null>(defaultFurigana);
  const [error, setError] = useState<string | null>(defaultError);
  const lastValue = useRef(defaultValue);

  const convertHandler = useDebouncedCallback((value: string) => {
    setLoading(true);
    fetchFurigana(value)
      .then((furiganaResponse: FuriganaResponse) => {
        setFurigana(furiganaResponse.furigana);
        setError(null);
      })
      .catch((e) => setError(parseError(e)))
      .finally(() => setLoading(false));
  }, debounceDelayInMs);

  const changeHandler: NonNullable<JapaneseTextInputProps["onChange"]> =
    useCallback(
      (value) => {
        setValue(value);

        const newValue = value.trim();
        if (lastValue.current === newValue) {
          return;
        }

        lastValue.current = newValue;
        convertHandler(newValue);
      },
      [convertHandler],
    );

  return (
    <div
      className="border border-b-0 border-gray-300 dark:border-gray-700 rounded grid overflow-hidden"
      style={{ gridTemplateRows: "auto auto 1fr" }}
    >
      {loading && <LoadingProgress />}
      <JapaneseTextControls
        onTextSizeChange={setTextSize}
        textSize={textSize}
      />
      {error ? (
        <Alert
          type="error"
          className="border-b border-gray-300 dark:border-gray-700 overflow-hidden"
        >
          {error}
        </Alert>
      ) : (
        <Alert
          type="info"
          className="border-b border-gray-300 dark:border-gray-700 overflow-hidden"
        >
          Furigana is currently not supported if the kanji expands over two
          lines. Please add a manual line break before the kanji.
        </Alert>
      )}
      <div className="p-4 overflow-y-scroll overflow-x-hidden">
        <JapaneseTextInput
          value={value ?? undefined}
          furigana={furigana ?? undefined}
          textSize={textSize}
          onRubyClick={onRubyClick}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
});
