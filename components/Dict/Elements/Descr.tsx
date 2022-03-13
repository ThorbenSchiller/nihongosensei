import { MinorText } from "@components/ui";
import type { DescrModel } from "@services/VocabularyService";
import React from "react";
import styles from "./Descr.module.css";
import { createElements } from "./helper/createElements";

export function Descr({ textAndJapAndTranscr }: DescrModel): JSX.Element {
  return (
    <MinorText className={styles.desc}>
      ({createElements(textAndJapAndTranscr)})
    </MinorText>
  );
}
