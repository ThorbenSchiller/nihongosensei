import { TextModel } from "../../services/VocabularyService";
import React from "react";

export function Text({ value }: TextModel): JSX.Element {
  return <>{value}</>;
}
