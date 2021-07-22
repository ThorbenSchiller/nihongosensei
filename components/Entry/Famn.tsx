import React from "react";
import { FamnModel } from "../../services/VocabularyService";

export function Famn({ value }: FamnModel): JSX.Element {
  return <b>{value}</b>;
}
