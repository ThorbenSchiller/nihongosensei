import React from "react";
import type { TranscrModel } from "../../services/VocabularyService";

export function Transcr({ content }: TranscrModel): JSX.Element {
  return <i>{content.join(" ")}</i>;
}
