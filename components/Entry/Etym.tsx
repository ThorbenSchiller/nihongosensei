import { EtymModel } from "../../services/VocabularyService";
import React from "react";
import { Ref } from "./Ref";
import { MinorText } from "./MinorText";
import { createElements } from "./createElements";

type EtymProps = EtymModel & {
  className?: string;
};

export function Etym({
  abbrev,
  textAndRefAndLiteral,
  className,
}: EtymProps): JSX.Element {
  return (
    <MinorText className={className}>
      {abbrev && <>(Abk. von {abbrev.ref && <Ref {...abbrev.ref} />}) </>}
      {textAndRefAndLiteral && <>({createElements(textAndRefAndLiteral)})</>}
    </MinorText>
  );
}
