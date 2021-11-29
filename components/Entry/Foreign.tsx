import React from "react";
import type { ForeignModel } from "../../services/VocabularyService";
import { isDefined } from "./guards";
import { setKeyProperty } from "./helper";
import { mapElement } from "./mapElement";

export function Foreign({ textAndEmph }: ForeignModel): JSX.Element {
  return (
    <span className="italic">
      {textAndEmph.map(mapElement).filter(isDefined).map(setKeyProperty())}
    </span>
  );
}
