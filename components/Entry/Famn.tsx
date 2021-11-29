import React from "react";
import type { FamnModel } from "../../services/VocabularyService";

export function Famn({ value }: FamnModel): JSX.Element {
  return <b>{value}</b>;
}
