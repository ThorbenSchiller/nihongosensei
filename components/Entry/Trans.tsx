import React from "react";
import { TransModel } from "../../services/VocabularyService";
import { createElements } from "./createElements";

export function Trans({ usgAndTrAndDef }: TransModel): JSX.Element {
  return <>{createElements(usgAndTrAndDef)}</>;
}
