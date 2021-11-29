import React from "react";
import type { DefModel } from "../../services/VocabularyService";
import { createElements } from "./createElements";

export function Def({ textAndLiteralAndTransl }: DefModel): JSX.Element {
  return <>{createElements(textAndLiteralAndTransl)}</>;
}
