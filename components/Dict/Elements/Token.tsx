import type { TokenModel } from "@services/VocabularyService";
import React from "react";
import { MinorText } from "../../ui";

export function Token({
  content,
  genus,
  numerus,
  type,
  article,
}: TokenModel): JSX.Element {
  return (
    <>
      {content}
      {!genus && type && (
        <MinorText>
          {" "}
          ({type}
          {!article && "Ar"})
        </MinorText>
      )}
      {genus && (
        <>
          {" "}
          <MinorText component="i">
            {genus.toLowerCase()}
            {numerus?.toLowerCase()}
          </MinorText>
        </>
      )}
    </>
  );
}
