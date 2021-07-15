import React from "react";
import { isDef, isDefined, isText, isToken, isTr, isTrans } from "./guards";
import { MinorText } from "./MinorText";
import { TrEntry } from "./TrEntry";
import { Token } from "./Token";
import { Text } from "./Text";

export function mapElement(
  element: unknown,
  index: number
): JSX.Element | JSX.Element[] | null {
  if (isTrans(element)) {
    return element.usgAndTrAndDef.map(mapElement).flat().filter(isDefined);
  }

  if (isTr(element)) {
    return <TrEntry key={index} {...element} />;
  }

  if (isDef(element)) {
    return (
      <MinorText key={index}>
        (
        {element.textAndLiteralAndTransl
          .map(mapElement)
          .flat()
          .filter(isDefined)}
        )
      </MinorText>
    );
  }

  if (isToken(element)) {
    return <Token key={index} {...element} />;
  }

  if (isText(element)) {
    return <Text key={index} {...element} />;
  }

  return null;
}
