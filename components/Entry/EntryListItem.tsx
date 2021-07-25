import { EntryModel } from "../../services/VocabularyService";
import { SenseEntries } from "./SenseEntries";
import React, { memo } from "react";
import { MinorText } from "./MinorText";
import RouterLink from "next/link";
import { Link } from "../Link";
import { Reading } from "./Reading";
import { Refs } from "./Refs";
import { EntryText } from "./EntryText";
import { useRouter } from "next/router";
import { useEntryContext } from "./EntryContext";
import { createElements } from "./createElements";

type EntryListItemProps = {
  entry: EntryModel;
  className?: string;
};

export const EntryListItem = memo(function EntryListItem({
  entry,
  className = "",
}: EntryListItemProps): JSX.Element {
  const {
    form: { orth, reading },
    sense,
    ref,
  } = entry;
  const { query } = useRouter();
  const { detailBasePath } = useEntryContext();

  return (
    <div
      className={`border-b dark:border-gray-700 pb-4 font-serif text-lg ${className}`}
    >
      <div className="mb-1">
        <RouterLink
          href={{
            pathname: `${detailBasePath}/${entry.id}`,
            query: {
              q: query.q,
            },
          }}
          passHref={true}
        >
          <Link lang="ja" color="text" className="text-xl">
            <EntryText orth={orth} />
          </Link>
        </RouterLink>
        <MinorText lang="ja" className="ml-2">
          <Reading reading={reading.hatsuon} />
        </MinorText>
      </div>
      <SenseEntries sense={sense} />
      {entry.expl && entry.expl.length > 0 && (
        <MinorText className="mt-2">{createElements(entry.expl)}</MinorText>
      )}
      <Refs className="mt-2" refs={ref ?? []} />
    </div>
  );
});
