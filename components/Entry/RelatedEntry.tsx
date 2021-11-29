import clsx from "clsx";
import React from "react";
import type { EntryModel } from "../../services/VocabularyService";
import { EntryLink } from "./EntryLink";
import { SenseEntries } from "./SenseEntries";

type RelatedEntryProps = {
  entry: EntryModel;
  className?: string;
};

export function RelatedEntry({
  entry,
  className,
}: RelatedEntryProps): JSX.Element {
  return (
    <div className={clsx("font-serif", className)}>
      <EntryLink entry={entry} color="text" />
      {": "}
      <SenseEntries sense={entry.sense} display="inline" />
    </div>
  );
}
