import React from "react";
import { TitleModel } from "../../services/VocabularyService";
import { createElements } from "./createElements";
import styles from "./Title.module.css";

export function Title({ textAndTokenAndEmph }: TitleModel): JSX.Element {
  return (
    <cite className={styles.title}>{createElements(textAndTokenAndEmph)}</cite>
  );
}
