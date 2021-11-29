import React from "react";
import type { TrModel } from "../../services/VocabularyService";
import { createElements } from "./createElements";

export function TrEntry({ textAndTokenAndDef }: TrModel): JSX.Element {
  return <>{createElements(textAndTokenAndDef)}</>;
}
