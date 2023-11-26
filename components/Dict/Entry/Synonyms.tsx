import { RelatedEntry } from "@components/Dict/Entry/RelatedEntry";
import { Heading } from "@components/ui";
import type { EntryModel } from "@services/VocabularyService";
import type { JSX } from "react";
// import styles from "./RelatedEntries.module.css";

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
      <Heading level={2} className="mb-3">
        Synonyme:{" "}
      </Heading>
      <ol className="list-decimal list-inside">
        {entries.map((entry) => (
          <RelatedEntry key={entry.id} className="py-1" entry={entry} />
        ))}
      </ol>
    </div>
  );
}
