import React from "react";
import type { ExplModel } from "../../../services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Expl({ textAndLiteralAndTransl }: ExplModel): JSX.Element {
  return <>{createElements(textAndLiteralAndTransl)}</>;
}
