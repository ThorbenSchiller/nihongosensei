import React, { memo } from "react";
import { useTextSize } from "../hooks";
import { Alert } from "../ui";
import JapaneseTextControls from "./JapaneseTextControls";
import JapaneseTextInput, { JapaneseTextInputProps } from "./JapaneseTextInput";

type JapaneseTextContainerProps = JapaneseTextInputProps;

function JapaneseTextContainer(props: JapaneseTextContainerProps): JSX.Element {
  const [textSize, setTextSize] = useTextSize();

  return (
    <div
      className="border border-b-0 border-gray-300 dark:border-gray-700 rounded grid overflow-hidden"
      style={{ gridTemplateRows: "auto auto 1fr" }}
    >
      <JapaneseTextControls
        onTextSizeChange={setTextSize}
        textSize={textSize}
      />
      <Alert
        type="info"
        className="border-b border-gray-300 dark:border-gray-700 overflow-hidden"
      >
        Furigana is currently not supported if the kanji expands over two lines.
        Please add a manual line break before the kanji.
      </Alert>
      <div className="p-4 overflow-y-scroll overflow-x-hidden">
        <JapaneseTextInput {...props} textSize={textSize} />
      </div>
    </div>
  );
}

export default memo(JapaneseTextContainer);
