import React from "react";
import { SenseModel } from "../../services/VocabularyService";
import { Usg } from "./Usg";
import { mapElement } from "./mapElement";
import styles from "./SenseEntry.module.css";
import { SenseEntries } from "./SenseEntries";
import { Descr } from "./Descr";
import { Refs } from "./Refs";
import { Etym } from "./Etym";

type SenseEntryProps = {
  senseEntry: SenseModel;
};

export function SenseEntry({ senseEntry }: SenseEntryProps): JSX.Element {
  const {
    sense,
    etym,
    descr,
    transAndBracketAndDef,
    ref,
    usg = [],
  } = senseEntry;

  return (
    <li
      className={`${styles.senseEntry} ${!sense && styles.senseEntryWithDot}`}
    >
      {etym &&
        etym.map((etymEntry, index) => (
          <Etym key={index} className="mr-1" {...etymEntry} />
        ))}
      {descr && <Descr {...descr} />}
      {sense && <SenseEntries className="ml-4" sense={sense} />}
      {usg.length > 0 && usg.map((usg, index) => <Usg key={index} {...usg} />)}
      {transAndBracketAndDef && (
        <span>{transAndBracketAndDef.map(mapElement)}</span>
      )}
      <Refs className="ml-1" component="span" refs={ref ?? []} />
    </li>
  );
}
