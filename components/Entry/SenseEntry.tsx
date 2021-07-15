import React from "react";
import { SenseModel } from "../../services/VocabularyService";
import { Usg } from "./Usg";
import { mapElement } from "./mapElement";
import styles from "./SenseEntry.module.css";
import { Ref } from "./Ref";

type SenseEntryProps = {
  sense: SenseModel;
};

export function SenseEntry({ sense }: SenseEntryProps): JSX.Element {
  return (
    <li className={styles.senseEntry}>
      {sense.usg &&
        sense.usg.length > 0 &&
        sense.usg.map((usg, index) => <Usg key={index} {...usg} />)}
      <span>{sense.transAndBracketAndDef.map(mapElement)}</span>
      {sense.ref && (
        <span className="text-blue-700 dark:text-blue-300">
          {" "}
          {sense.ref.map((ref) => (
            <Ref key={ref.id} {...ref} />
          ))}
        </span>
      )}
    </li>
  );
}
