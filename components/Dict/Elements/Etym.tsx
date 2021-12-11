import React from "react";
import { EtymModel } from "../../../services/VocabularyService";
import { MinorText } from "../../ui";
import { createElements } from "./helper/createElements";
import { Ref } from "./Ref";

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
