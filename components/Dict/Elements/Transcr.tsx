import type { TranscrModel } from "@services/VocabularyService";
import React from "react";

export function Transcr({ content }: TranscrModel): JSX.Element {
  return <i>{content.join(" ")}</i>;
}
