import { TextModel } from "../../services/VocabularyService";
import React from "react";

export function Text({
  hasFollowingSpace = false,
  hasPrecedingSpace = false,
  value,
}: TextModel): JSX.Element {
  return (
    <span>
      {hasPrecedingSpace && " "}
      {value}
      {hasFollowingSpace && " "}
    </span>
  );
}
