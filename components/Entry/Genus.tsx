import { GenusType } from "../../services/VocabularyService";
import { MinorText } from "./MinorText";
import React from "react";

export function Genus({ genus }: { genus: GenusType }): JSX.Element {
  return (
    <MinorText className="font-serif italic">{genus.toLowerCase()}</MinorText>
  );
}
