import { useCallback, useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "furigana-text-size";
const DEFAULT_SIZE = 100;

function getInitialValue() {
  if (typeof localStorage !== "undefined") {
    const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);

    return Number(localStorageValue) || DEFAULT_SIZE;
  }

  return DEFAULT_SIZE;
}

/**
 * This hooks retrieves the preferred text size for the textarea input.
 * If a value is stored in the {@link localStorage}, this value will be set on
 * client via an {@link useEffect} call.
 * If no value is present, the {@link DEFAULT_SIZE} will be used.
 * Upon storing the new value is stored in the {@link localStorage}.
 */
export function useTextSize(): [number, (textSize: number) => void] {
  const [textSize, setTextSize] = useState(DEFAULT_SIZE);
  const enhancedSetTextSize = useCallback((textSize: number) => {
    setTextSize(textSize);
    localStorage?.setItem(LOCAL_STORAGE_KEY, textSize.toString());
  }, []);

  useEffect(() => {
    setTextSize(getInitialValue());
  }, []);

  return [textSize, enhancedSetTextSize];
}
