import { TrModel } from "../../services/VocabularyService";
import React from "react";
import { mapElement } from "./mapElement";
import styles from "./TrEntry.module.css";

export function TrEntry({ textAndTokenAndDef }: TrModel): JSX.Element {
  return (
    <span className={styles.transEntry}>
      {textAndTokenAndDef.map(mapElement)}
    </span>
  );
}
