import clsx from "clsx";
import React from "react";
import type { SenseModel } from "../../../services/VocabularyService";
import { createElements, Descr, Etym, Refs, SeasonWord } from "../Elements";
import { SenseEntries } from "./SenseEntries";
import styles from "./SenseEntry.module.css";
import { UsgEntries } from "./UsgEntries";

type SenseEntryProps = {
  senseEntry: SenseModel;
};

export function SenseEntry({ senseEntry }: SenseEntryProps): JSX.Element {
  const {
    sense,
    etym,
    descr,
    transAndBracketAndDef = [],
    ref,
    usg = [],
    seasonword,
  } = senseEntry;

  return (
    <li className={clsx(styles.senseEntry, !sense && styles.senseEntryWithDot)}>
      {etym &&
        etym.map((etymEntry, index) => (
          <Etym key={index} className="mr-1" {...etymEntry} />
        ))}
      {descr && <Descr {...descr} />}
      {sense && <SenseEntries className="ml-4" sense={sense} />}
      {usg && <UsgEntries usg={usg} />}
      {transAndBracketAndDef && createElements(transAndBracketAndDef)}
      <Refs className="ml-1" component="span" refs={ref ?? []} />
      {seasonword?.map((season) => (
        <SeasonWord key={season.type} {...season} />
      ))}
    </li>
  );
}
