import { TokenModel } from "../../services/VocabularyService";
import React from "react";
import { Genus } from "./Genus";
import { MinorText } from "./MinorText";

export function Token({
  content,
  genus,
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
          <Genus genus={genus} />
        </>
      )}
    </>
  );
}
