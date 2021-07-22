import React from "react";
import { EmphModel } from "../../services/VocabularyService";

export function Emph({ value }: EmphModel): JSX.Element {
  return <em className="border-b border-dotted border-gray-500">{value}</em>;
}
