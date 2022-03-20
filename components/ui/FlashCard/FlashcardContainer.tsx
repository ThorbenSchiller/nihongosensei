import React, { useCallback, useState } from "react";
import { FlashCard, FlashcardProps } from "./Flashcard";

export type FlashcardContainerProps = Omit<
  FlashcardProps,
  "flipped" | "onClick"
>;

export function FlashcardContainer(
  props: FlashcardContainerProps
): JSX.Element {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = useCallback(
    () => setFlipped((currentFlipped) => !currentFlipped),
    []
  );

  return <FlashCard {...props} flipped={flipped} onClick={handleFlip} />;
}
