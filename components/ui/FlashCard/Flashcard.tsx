import { EntryFull } from "@components/Dict";
import { EntryText } from "@components/Dict/Entry/EntryText";
import { EntryModel } from "@services/VocabularyService";
import clsx from "clsx";
import React, { HTMLProps } from "react";
import styles from "./Flashcard.module.css";

export type FlashcardProps = {
  entry: EntryModel;
  flipped?: boolean;
} & HTMLProps<HTMLDivElement>;

export function FlashCard({
  entry,
  flipped = false,
  className,
  ...rest
}: FlashcardProps): JSX.Element {
  return (
    <div
      className={clsx(styles.flashcard, flipped && styles.flipped, className)}
      data-testid="flashcard"
      {...rest}
    >
      <div className={styles.front} data-testid="flashcard-front">
        <EntryText orth={entry.form.orth} />
      </div>
      <div className={styles.back} data-testid="flashcard-back">
        <EntryFull entry={entry} />
      </div>
    </div>
  );
}
