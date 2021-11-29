import React from "react";
import type { DescrModel } from "../../services/VocabularyService";
import { createElements } from "./createElements";
import styles from "./Descr.module.css";
import { MinorText } from "./MinorText";

export function Descr({ textAndJapAndTranscr }: DescrModel): JSX.Element {
  return (
    <MinorText className={styles.desc}>
      ({createElements(textAndJapAndTranscr)})
    </MinorText>
  );
}
