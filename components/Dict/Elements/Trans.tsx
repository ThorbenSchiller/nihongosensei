import type { TransModel } from "@services/VocabularyService";
import React from "react";
import { createElements } from "./helper/createElements";

export function Trans({ usgAndTrAndDef }: TransModel): JSX.Element {
  return <>{createElements(usgAndTrAndDef)}</>;
}
