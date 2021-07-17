import React from "react";
import { ForeignModel } from "../../services/VocabularyService";
import { mapElement } from "./mapElement";

export function Foreign({ textAndEmph }: ForeignModel): JSX.Element {
  return <span className="italic">{textAndEmph.map(mapElement)}</span>;
}
