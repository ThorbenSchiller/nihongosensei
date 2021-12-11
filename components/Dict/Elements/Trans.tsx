import React from "react";
import type { TransModel } from "../../../services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Trans({ usgAndTrAndDef }: TransModel): JSX.Element {
  return <>{createElements(usgAndTrAndDef)}</>;
}
