import React from "react";
import { SenseModel } from "../../services/VocabularyService";
import styles from "./SenseEntry.module.css";
import { SenseEntries } from "./SenseEntries";
import { Descr } from "./Descr";
import { Refs } from "./Refs";
import { Etym } from "./Etym";
import { createElements } from "./createElements";
import { UsgEntries } from "./UsgEntries";
import clsx from "clsx";
import { SeasonWord } from "./SeasonWord";

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
      {transAndBracketAndDef && (
        <span>{createElements(transAndBracketAndDef)}</span>
      )}
      <Refs className="ml-1" component="span" refs={ref ?? []} />
      {seasonword?.map((season) => (
        <SeasonWord key={season.type} {...season} />
      ))}
    </li>
  );
}
