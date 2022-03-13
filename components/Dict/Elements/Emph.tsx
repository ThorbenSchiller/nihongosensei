import type { EmphModel } from "@services/VocabularyService";
import React from "react";

export function Emph({ value }: EmphModel): JSX.Element {
  return <em className="border-b border-dotted border-gray-500">{value}</em>;
}
