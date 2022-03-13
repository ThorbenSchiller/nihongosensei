import type { IronModel } from "@services/VocabularyService";
import React from "react";
import { createElements } from "./helper/createElements";
import styles from "./Iron.module.css";

export function Iron({ textAndToken }: IronModel): JSX.Element {
  return <span className={styles.iron}>{createElements(textAndToken)}</span>;
}
