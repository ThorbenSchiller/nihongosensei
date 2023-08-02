import { ChangeEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { VocabularyProvider } from "./VocabularyProvider";

type VocabularyContainerProps = {
  className?: string;
  vocabulary?: string;
  onChange?: (vocabulary: string) => void;
};

export function VocabularyContainer({
  className,
  vocabulary,
  onChange,
}: VocabularyContainerProps): JSX.Element {
  const [inputValue, setInputValue] = useState(vocabulary);
  const changeHandler = useDebouncedCallback((value: string) => {
    onChange?.(value);
  }, 500);
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
    changeHandler(value);
  };

  useEffect(() => {
    setInputValue(vocabulary);
  }, [vocabulary]);

  return (
    <div className={className}>
      <input
        value={inputValue}
        onChange={inputChangeHandler}
        className="w-full p-3 py-4 bg-transparent border-t border-b md:border border-gray-300 dark:border-gray-700 md:rounded"
        placeholder="Vocabulary Search"
      />
      {vocabulary && (
        <VocabularyProvider text={vocabulary} className="md:mt-4 w-full" />
      )}
    </div>
  );
}
