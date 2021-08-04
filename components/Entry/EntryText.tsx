import { OrthModel } from "../../services/VocabularyService";
import React from "react";
import { PreferredText } from "./PreferredText";
import styles from "./EntryText.module.css";
import clsx from "clsx";

type EntryCardProps = {
  orth: OrthModel[];
  className?: string;
};

export function EntryText({ orth, className }: EntryCardProps): JSX.Element {
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
