import type { SenseModel } from "@services/VocabularyService";
import clsx from "clsx";
import React from "react";
import { SenseEntry } from "./SenseEntry";
import styles from "./SenseGroup.module.css";

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
      className={clsx(styles.senseGroupEntry, display == "inline" && "inline")}
    >
      <ul className="inline">
        {senses.map((sense, index) => (
          <SenseEntry key={index} senseEntry={sense} />
        ))}
      </ul>
    </li>
  );
}
