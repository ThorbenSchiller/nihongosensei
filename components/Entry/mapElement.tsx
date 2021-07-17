import React, { Fragment } from "react";
import {
  isBracket,
  isDef,
  isDefined,
  isForeign,
  isRef,
  isText,
  isToken,
  isTr,
  isTrans,
} from "./guards";
import { TrEntry } from "./TrEntry";
import { Token } from "./Token";
import { Text } from "./Text";
import { Bracket } from "./Bracket";
import { Def } from "./Def";
import { Ref } from "./Ref";
import { Foreign } from "./Foreign";

export function mapElement(
  element: unknown,
  index: number
): JSX.Element | JSX.Element[] | null {
  if (isTrans(element)) {
    return element.usgAndTrAndDef
      .map((element, index) => mapElement(element, index))
      .flat()
      .filter(isDefined);
  }

  if (isTr(element)) {
    return <TrEntry key={index} {...element} />;
  }

  if (isDef(element)) {
    return <Def key={index} {...element} />;
  }

  if (isBracket(element)) {
    return <Bracket key={index} {...element} />;
  }

  if (isToken(element)) {
    return <Token key={index} {...element} />;
  }

  if (isText(element)) {
    return <Text key={index} {...element} />;
  }

  if (isRef(element)) {
    return <Ref key={index} {...element} />;
  }

  if (isForeign(element)) {
    return <Foreign key={index} {...element} />;
  }

  if (typeof element === "string") {
    return <Fragment key={index}>{element}</Fragment>;
  }

  return null;
}
