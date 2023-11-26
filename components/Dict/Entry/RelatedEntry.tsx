import type { EntryModel } from "@services/VocabularyService";
import clsx from "clsx";
import type { JSX } from "react";
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
    <li className={clsx("font-serif", className)}>
      <EntryLink entry={entry} color="primary" />
      {": "}
      <SenseEntries sense={entry.sense} display="inline" />
    </li>
  );
}
