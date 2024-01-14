import { Link, MinorText } from "@components/ui";
import type { EntryModel } from "@services/VocabularyService";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo } from "react";
import { useEntryContext } from "../Context";
import { Refs, createElements } from "../Elements";
import { EntryText } from "./EntryText";
import { Reading } from "./Reading";
import { SenseEntries } from "./SenseEntries";

type EntryListItemProps = {
  entry: EntryModel;
  className?: string;
};

export const EntryListItem = memo(function EntryListItem({
  entry,
  className,
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
      className={clsx(
        "border-b border-gray-300 dark:border-gray-700 pb-4 font-serif text-lg",
        className
      )}
    >
      <div className="mb-1">
        <Link
          href={{
            pathname: `${detailBasePath}/${entry.id}`,
            query: {
              q: query.q,
            },
          }}
          lang="ja"
          color="primary"
          className="text-xl"
        >
          <EntryText orth={orth} />
        </Link>
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
