import type { EntryModel } from "@services/VocabularyService";
import React from "react";
import { EntryLink } from "./EntryLink";
import styles from "./RelatedEntries.module.css";

type SynonymsProps = {
  entries: ReadonlyArray<EntryModel>;
  className?: string;
};

export function Synonyms({
  entries,
  className,
}: SynonymsProps): JSX.Element | null {
  if (!entries.length) {
    return null;
  }

  return (
    <div className={className}>
      Synonyme:{" "}
      {entries.map((entry) => (
        <EntryLink
          className={styles.relatedEntry}
          key={entry.id}
          entry={entry}
        />
      ))}
    </div>
  );
}
