import React from "react";
import type { SpeccharModel } from "../../../services/VocabularyService";
import styles from "./Specchar.module.css";

export function Specchar({ value }: SpeccharModel): JSX.Element {
  return <span className={styles.specchar}>{value}</span>;
}
