import RouterLink from "next/link";
import { EntryModel } from "../../services/VocabularyService";
import React from "react";
import { Link } from "../Link";
import { EntryText } from "./EntryText";

type RelatedEntryProps = {
  entry: EntryModel;
  className?: string;
};

export function RelatedEntry({
  entry,
  className,
}: RelatedEntryProps): JSX.Element {
  const {
    form: { orth },
  } = entry;

  return (
    <RouterLink href={`/entry/${entry.id}`} passHref={true}>
      <Link className={className}>
        <EntryText orth={orth} />
      </Link>
    </RouterLink>
  );
}
