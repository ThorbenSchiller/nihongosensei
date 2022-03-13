import type { ExplModel } from "@services/VocabularyService";
import React from "react";
import { createElements } from "./helper/createElements";

export function Expl({ textAndLiteralAndTransl }: ExplModel): JSX.Element {
  return <>{createElements(textAndLiteralAndTransl)}</>;
}
