import React from "react";
import { TranslModel } from "../../services/VocabularyService";
import styles from "./Transl.module.css";

export function Transl({ value }: TranslModel): JSX.Element {
  return <span className={styles.transl}>{value}</span>;
}
