import React from "react";
import { SenseModel } from "../../services/VocabularyService";
import { Usg } from "./Usg";
import styles from "./SenseEntry.module.css";
import { SenseEntries } from "./SenseEntries";
import { Descr } from "./Descr";
import { Refs } from "./Refs";
import { Etym } from "./Etym";
import { joinBy } from "./helper";
import { createElements } from "./createElements";

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
      {usg.length > 0 && (
        <>
          {usg
            .map((usg, index) => <Usg key={index} {...usg} />)
            .reduce(joinBy(" "), [])}{" "}
        </>
      )}
      {transAndBracketAndDef && (
        <span>{createElements(transAndBracketAndDef)}</span>
      )}
      <Refs className="ml-1" component="span" refs={ref ?? []} />
    </li>
  );
}
