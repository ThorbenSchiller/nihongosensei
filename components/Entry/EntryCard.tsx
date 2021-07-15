import { EntryModel } from "../../services/VocabularyService";
import { SenseEntries } from "./SenseEntries";
import React, { memo } from "react";
import { MinorText } from "./MinorText";
import { mapElement } from "./mapElement";

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
  } = entry;

  const preferredReadings = orth.filter((orth) => orth.midashigo);

  return (
    <div className={`border dark:border-gray-700 rounded p-4 ${className}`}>
      <div className="text-4xl mb-2">
        {preferredReadings.length > 0
          ? preferredReadings[0].value
          : orth[0].value}
      </div>
      <div className="text-xl text-gray-700 dark:text-gray-300 mb-2">
        {entry.form.reading.hatsuon}
      </div>
      <SenseEntries sense={sense} />
      {entry.expl && entry.expl.length > 0 && (
        <MinorText className="mt-2">{entry.expl.map(mapElement)}</MinorText>
      )}

      {orth.length > 1 && (
        <div className="mt-2">
          Andere Lesungen:
          <ul>
            {orth.map((orth, index) => (
              <li key={index}>{orth.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
