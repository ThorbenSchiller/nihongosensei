import { EntryModel } from "../../services/VocabularyService";
import { SenseEntries } from "./SenseEntries";
import React, { memo } from "react";
import { MinorText } from "./MinorText";
import { Reading } from "./Reading";
import { Refs } from "./Refs";
import { EntryText } from "./EntryText";
import { createElements } from "./createElements";

type EntryFullProps = {
  entry: EntryModel;
  className?: string;
};

export const EntryFull = memo(function EntryFull({
  entry,
  className = "",
}: EntryFullProps): JSX.Element {
  const {
    form: { orth, reading },
    sense,
    ref,
  } = entry;
  const firstReading = orth[0].value;

  return (
    <div className={`font-serif text-lg ${className}`}>
      <div lang="ja" className="mb-2 text-5xl">
        <EntryText orth={orth} />
      </div>
      {firstReading !== reading.hatsuon && (
        <MinorText lang="ja" className="text-xl mb-2" component="div">
          <Reading reading={reading.hatsuon} />
        </MinorText>
      )}
      <SenseEntries sense={sense} />
      {entry.expl && entry.expl.length > 0 && (
        <MinorText className="mt-2">{createElements(entry.expl)}</MinorText>
      )}
      <Refs className="mt-2" refs={ref ?? []} />
    </div>
  );
});
