import type { SenseModel } from "@services/VocabularyService";
import clsx from "clsx";
import React from "react";
import styles from "./SenseEntries.module.css";
import { SenseGroup } from "./SenseGroup";

type SenseEntriesProps = {
  sense: SenseModel[];
  className?: string;
  listType?: "decimal" | "alphabetic";
  display?: "block" | "inline";
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

export function SenseEntries({
  sense,
  className,
  listType = "decimal",
  display = "block",
}: SenseEntriesProps): JSX.Element {
  const groupedByRelated = groupByRelated(sense);
  const hasMultipleSenses = sense.some((entry) => entry.sense);
  if (hasMultipleSenses) {
    listType = "alphabetic";
  }

  return (
    <ol
      className={clsx(
        "list-inside",
        styles[listType],
        display === "inline" && "inline",
        className,
      )}
    >
      {groupedByRelated.map((senseGroup, index) => (
        <SenseGroup key={index} display={display} senses={senseGroup} />
      ))}
    </ol>
  );
}
