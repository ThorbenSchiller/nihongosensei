import React from "react";
import { ForeignModel } from "../../services/VocabularyService";
import { mapElement } from "./mapElement";
import { setKeyProperty } from "./helper";
import { isDefined } from "./guards";

export function Foreign({ textAndEmph }: ForeignModel): JSX.Element {
  return (
    <span className="italic">
      {textAndEmph.map(mapElement).filter(isDefined).map(setKeyProperty())}
    </span>
  );
}
