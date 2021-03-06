import type { OrthModel } from "@services/VocabularyService";
import clsx from "clsx";
import React from "react";
import styles from "./EntryText.module.css";
import { PreferredText } from "./PreferredText";

type EntryTextProps = {
  orth: OrthModel[];
  className?: string;
};

export function EntryText({ orth, className }: EntryTextProps): JSX.Element {
  const preferredReadings = orth.filter((orth) => orth.midashigo);
  if (!preferredReadings.length) {
    return (
      <span className={clsx(styles.reading, className)}>
        <PreferredText text={orth[0].value} />
      </span>
    );
  }

  return (
    <>
      {preferredReadings.map((reading) => (
        <span key={reading.value} className={clsx(styles.reading, className)}>
          <PreferredText text={reading.value} />
        </span>
      ))}
    </>
  );
}
