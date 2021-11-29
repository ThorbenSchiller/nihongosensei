import React from "react";
import type { IronModel } from "../../services/VocabularyService";
import { createElements } from "./createElements";
import styles from "./Iron.module.css";

export function Iron({ textAndToken }: IronModel): JSX.Element {
  return <span className={styles.iron}>{createElements(textAndToken)}</span>;
}
