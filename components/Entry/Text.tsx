import React from "react";
import type { TextModel } from "../../services/VocabularyService";

export function Text({ value }: TextModel): JSX.Element {
  return <>{value}</>;
}
