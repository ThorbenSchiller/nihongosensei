import { EntryModel } from "../../services/VocabularyService";
import React from "react";
import { RelatedEntry } from "./RelatedEntry";
import styles from "./RelatedEntries.module.css";

type RelatedEntryProps = {
  entries: EntryModel[];
};

export function RelatedEntries({
  entries,
}: RelatedEntryProps): JSX.Element | null {
  if (!entries.length) {
    return null;
  }

  return (
    <div className="mt-2">
      Synonyme:{" "}
      {entries.map((entry) => (
        <RelatedEntry
          className={styles.relatedEntry}
          key={entry.id}
          entry={entry}
        />
      ))}
    </div>
  );
}
