import RouterLink from "next/link";
import { EntryModel } from "../../services/VocabularyService";
import React from "react";
import { Link, LinkProps } from "../Link";
import { EntryText } from "./EntryText";
import { useRouter } from "next/router";
import { useEntryContext } from "./EntryContext";

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
