import { SenseModel } from "../../services/VocabularyService";
import React from "react";
import { SenseGroup } from "./SenseGroup";

type SenseEntriesProps = {
  sense: SenseModel[];
};

/**
 * Groups the given senses into groups if the {@link SenseModel#related}
 * property is set.
 *
 * @param senseEntries The senses to group.
 */
function groupByRelated(senseEntries: ReadonlyArray<SenseModel>) {
  const groupedByRelated: SenseModel[][] = [];
  let group = [];
  for (let i = 0; i < senseEntries.length; i++) {
    const senseEntry = senseEntries[i];
    const nextSenseEntry = senseEntries[i + 1];
    group.push(senseEntry);
    if (nextSenseEntry?.related) {
      continue;
    }

    groupedByRelated.push(group);
    group = [];
  }

  return groupedByRelated;
}

export function SenseEntries({ sense }: SenseEntriesProps): JSX.Element {
  const groupedByRelated = groupByRelated(sense);

  return (
    <ol className="list-inside list-decimal">
      {groupedByRelated.map((senseGroup, index) => (
        <SenseGroup key={index} senses={senseGroup} />
      ))}
    </ol>
  );
}
