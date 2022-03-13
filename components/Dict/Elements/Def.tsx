import type { DefModel } from "@services/VocabularyService";
import React from "react";
import { createElements } from "./helper/createElements";

export function Def({ textAndLiteralAndTransl }: DefModel): JSX.Element {
  return <>{createElements(textAndLiteralAndTransl)}</>;
}
