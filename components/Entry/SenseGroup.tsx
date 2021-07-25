import { SenseModel } from "../../services/VocabularyService";
import styles from "./Sense.module.css";
import React from "react";
import { SenseEntry } from "./SenseEntry";

type SenseGroupProps = {
  senses: SenseModel[];
  display?: "block" | "inline";
};

export function SenseGroup({
  senses,
  display = "block",
}: SenseGroupProps): JSX.Element {
  return (
    <li
      className={`${styles.senseGroupEntry} ${display == "inline" && "inline"}`}
    >
      <ul className="inline">
        {senses.map((sense, index) => (
          <SenseEntry key={index} senseEntry={sense} />
        ))}
      </ul>
    </li>
  );
}
