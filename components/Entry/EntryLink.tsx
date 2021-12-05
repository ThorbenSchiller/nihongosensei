import RouterLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import type { EntryModel } from "../../services/VocabularyService";
import { Link, LinkProps } from "../ui";
import { useEntryContext } from "./EntryContext";
import { EntryText } from "./EntryText";

type RelatedEntryProps = {
  entry: EntryModel;
  className?: string;
} & Pick<LinkProps, "color">;

export function EntryLink({
  entry,
  className,
  color,
}: RelatedEntryProps): JSX.Element {
  const {
    form: { orth },
  } = entry;
  const { query } = useRouter();
  const { detailBasePath } = useEntryContext();

  return (
    <RouterLink
      href={{
        pathname: `${detailBasePath}/${entry.id}`,
        query: {
          q: query.q,
        },
      }}
      passHref={true}
    >
      <Link className={className} color={color}>
        <EntryText orth={orth} />
      </Link>
    </RouterLink>
  );
}
