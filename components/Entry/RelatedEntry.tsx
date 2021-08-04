import { EntryModel } from "../../services/VocabularyService";
import React from "react";
import { EntryLink } from "./EntryLink";
import { SenseEntries } from "./SenseEntries";
import clsx from "clsx";

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
