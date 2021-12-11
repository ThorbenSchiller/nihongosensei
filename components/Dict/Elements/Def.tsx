import React from "react";
import type { DefModel } from "../../../services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Def({ textAndLiteralAndTransl }: DefModel): JSX.Element {
  return <>{createElements(textAndLiteralAndTransl)}</>;
}
