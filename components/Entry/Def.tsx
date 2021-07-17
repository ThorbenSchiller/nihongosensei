import React from "react";
import { DefModel } from "../../services/VocabularyService";
import { mapElement } from "./mapElement";
import { isDefined } from "./guards";
import styles from "./Def.module.css";

export function Def({ textAndLiteralAndTransl }: DefModel): JSX.Element {
  return (
    <dfn className={styles.def}>
      {textAndLiteralAndTransl.map(mapElement).flat().filter(isDefined)}
    </dfn>
  );
}
