import { SenseModel } from "../../services/VocabularyService";
import styles from "./Sense.module.css";
import React from "react";
import { SenseEntry } from "./SenseEntry";

export function SenseGroup({ senses }: { senses: SenseModel[] }): JSX.Element {
  return (
    <li className={styles.senseGroupEntry}>
      <ul className="inline">
        {senses.map((sense, index) => (
          <SenseEntry key={index} senseEntry={sense} />
        ))}
      </ul>
    </li>
  );
}
