import type { TitleModel } from "@services/VocabularyService";
import React from "react";
import { createElements } from "./helper/createElements";
import styles from "./Title.module.css";

export function Title({ textAndTokenAndEmph }: TitleModel): JSX.Element {
  return (
    <cite className={styles.title}>{createElements(textAndTokenAndEmph)}</cite>
  );
}
