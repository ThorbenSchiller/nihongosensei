import React from "react";
import { TranscrModel } from "../../services/VocabularyService";

export function Transcr({ content }: TranscrModel): JSX.Element {
  return <i>{content.join(" ")}</i>;
}
