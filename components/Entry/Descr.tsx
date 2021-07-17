import React from "react";
import { DescrModel } from "../../services/VocabularyService";
import { MinorText } from "./MinorText";
import { mapElement } from "./mapElement";
import styles from "./Descr.module.css";

export function Descr(descr: DescrModel): JSX.Element {
  return (
    <MinorText className={styles.desc}>
      ({descr.textAndJapAndTranscr.map(mapElement)})
    </MinorText>
  );
}
