import { EntryModel } from "../../services/VocabularyService";
import { SenseEntries } from "./SenseEntries";
import React, { memo } from "react";
import { MinorText } from "./MinorText";
import { mapElement } from "./mapElement";
import RouterLink from "next/link";
import { Link } from "../Link";
import { Reading } from "./Reading";
import { Refs } from "./Refs";
import { EntryText } from "./EntryText";
import { useRouter } from "next/router";
import { useEntryContext } from "./EntryContext";

type EntryCardProps = {
  entry: EntryModel;
  className?: string;
};

export const EntryCard = memo(function EntryCard({
  entry,
  className = "",
}: EntryCardProps): JSX.Element {
  const {
    form: { orth },
    sense,
    ref,
  } = entry;
  const { query } = useRouter();
  const { detailBasePath } = useEntryContext();

  return (
    <div
      className={`border dark:border-gray-700 rounded p-4 font-serif ${className}`}
    >
      <div className="text-4xl mb-2">
        <RouterLink
          href={{
            pathname: `${detailBasePath}/${entry.id}`,
            query: {
              q: query.q,
            },
          }}
          passHref={true}
        >
          <Link lang="ja" color="text">
            <EntryText orth={orth} />
          </Link>
        </RouterLink>
      </div>
      <div lang="ja" className="text-xl text-gray-700 dark:text-gray-300 mb-2">
        <Reading reading={entry.form.reading.hatsuon} />
      </div>
      <SenseEntries sense={sense} />
      {entry.expl && entry.expl.length > 0 && (
        <MinorText className="mt-2">{entry.expl.map(mapElement)}</MinorText>
      )}
      <Refs className="mt-2" refs={ref ?? []} />
    </div>
  );
});
