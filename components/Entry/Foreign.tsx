import React from "react";
import { ForeignModel } from "../../services/VocabularyService";
import { mapElementWithKey } from "./mapElement";

export function Foreign({ textAndEmph }: ForeignModel): JSX.Element {
  return <span className="italic">{textAndEmph.map(mapElementWithKey)}</span>;
}
