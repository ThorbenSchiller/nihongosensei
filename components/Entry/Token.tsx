import { TokenModel } from "../../services/VocabularyService";
import React from "react";
import { Genus } from "./Genus";

export function Token({ content, genus }: TokenModel): JSX.Element {
  return (
    <>
      {content}
      {genus && (
        <>
          {" "}
          <Genus genus={genus} />
        </>
      )}
    </>
  );
}
