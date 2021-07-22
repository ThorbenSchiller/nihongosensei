import React from "react";
import { DescrModel } from "../../services/VocabularyService";
import { MinorText } from "./MinorText";
import styles from "./Descr.module.css";
import { createElements } from "./createElements";

export function Descr({ textAndJapAndTranscr }: DescrModel): JSX.Element {
  return (
    <MinorText className={styles.desc}>
      ({createElements(textAndJapAndTranscr)})
    </MinorText>
  );
}
