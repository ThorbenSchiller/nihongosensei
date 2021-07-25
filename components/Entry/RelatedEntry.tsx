import { EntryModel } from "../../services/VocabularyService";
import React from "react";
import { EntryLink } from "./EntryLink";
import { SenseEntries } from "./SenseEntries";

type RelatedEntryProps = {
  entry: EntryModel;
  className?: string;
};

export function RelatedEntry({
  entry,
  className = "",
}: RelatedEntryProps): JSX.Element {
  return (
    <div className={`font-serif ${className}`}>
      <EntryLink entry={entry} color="text" />
      {": "}
      <SenseEntries sense={entry.sense} display="inline" />
    </div>
  );
}
