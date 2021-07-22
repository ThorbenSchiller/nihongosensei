import React from "react";
import { IronModel } from "../../services/VocabularyService";
import styles from "./Iron.module.css";
import { createElements } from "./createElements";

export function Iron({ textAndToken }: IronModel): JSX.Element {
  return <span className={styles.iron}>{createElements(textAndToken)}</span>;
}
