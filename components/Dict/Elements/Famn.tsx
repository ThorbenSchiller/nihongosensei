import type { FamnModel } from "@services/VocabularyService";
import React from "react";

export function Famn({ value }: FamnModel): JSX.Element {
  return <b>{value}</b>;
}
