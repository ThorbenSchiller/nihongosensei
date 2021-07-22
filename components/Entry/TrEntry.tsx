import { TrModel } from "../../services/VocabularyService";
import React from "react";
import { createElements } from "./createElements";

export function TrEntry({ textAndTokenAndDef }: TrModel): JSX.Element {
  return <>{createElements(textAndTokenAndDef)}</>;
}
