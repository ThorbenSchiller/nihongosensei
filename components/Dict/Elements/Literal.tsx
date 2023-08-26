import type { LiteralModel } from "@services/VocabularyService";
import { JSX } from "react";
import styles from "./Literal.module.css";
import { createElements } from "./helper/createElements";

export function Literal({ textAndToken }: LiteralModel): JSX.Element {
  return <span className={styles.literal}>{createElements(textAndToken)}</span>;
}
