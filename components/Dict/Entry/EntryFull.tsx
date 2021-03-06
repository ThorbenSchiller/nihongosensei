import { MinorText } from "@components/ui";
import type { EntryModel } from "@services/VocabularyService";
import clsx from "clsx";
import React, { memo } from "react";
import { createElements, GramGrp, Refs } from "../Elements";
import { EntryText } from "./EntryText";
import { OtherReadings } from "./OtherReadings";
import { Reading } from "./Reading";
import { SenseEntries } from "./SenseEntries";
import { UsgEntries } from "./UsgEntries";

type EntryFullProps = {
  entry: EntryModel;
  className?: string;
};

export const EntryFull = memo(function EntryFull({
  entry,
  className,
}: EntryFullProps): JSX.Element {
  const {
    form: { orth, reading },
    sense,
    ref,
    usg,
    gramGrp,
  } = entry;
  const firstReading = orth[0].value;

  return (
    <div className={clsx("font-serif text-lg", className)}>
      <h1 lang="ja" className="mb-2 text-5xl">
        <EntryText orth={orth} />
      </h1>
      {firstReading !== reading.hatsuon && (
        <MinorText lang="ja" className="text-xl mb-2" component="h2">
          <Reading reading={reading.hatsuon} />
        </MinorText>
      )}
      {gramGrp && (
        <MinorText component="div" className="mb-2">
          (<GramGrp {...gramGrp} />)
        </MinorText>
      )}
      {usg && <UsgEntries usg={usg} />}
      <SenseEntries sense={sense} />
      {entry.expl && entry.expl.length > 0 && (
        <MinorText className="mt-2">{createElements(entry.expl)}</MinorText>
      )}
      <Refs className="mt-2" refs={ref ?? []} />
      <OtherReadings orth={orth} />
    </div>
  );
});
