import React from "react";
import type { ForeignModel } from "../../../services/VocabularyService";
import { setKeyProperty } from "../helper";
import { isDefined } from "./helper/guards";
import { mapElement } from "./helper/mapElement";

export function Foreign({ textAndEmph }: ForeignModel): JSX.Element {
  return (
    <span className="italic">
      {textAndEmph.map(mapElement).filter(isDefined).map(setKeyProperty())}
    </span>
  );
}
