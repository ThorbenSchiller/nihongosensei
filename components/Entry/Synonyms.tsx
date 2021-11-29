import React from "react";
import type { EntryModel } from "../../services/VocabularyService";
import { EntryLink } from "./EntryLink";
import styles from "./RelatedEntries.module.css";

type SynonymsProps = {
  entries: EntryModel[];
};

export function Synonyms({ entries }: SynonymsProps): JSX.Element | null {
  if (!entries.length) {
    return null;
  }

  return (
    <div className="mt-2">
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
