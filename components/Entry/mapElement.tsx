import React, { Fragment } from "react";
import {
  isBracket,
  isDef,
  isEmph,
  isExpl,
  isFamnModel,
  isForeign,
  isIron,
  isRef,
  isSpecchar,
  isText,
  isTitleModel,
  isToken,
  isTopic,
  isTr,
  isTrans,
  isTranscr,
  isTranslModel,
} from "./guards";
import { TrEntry } from "./TrEntry";
import { Token } from "./Token";
import { Text } from "./Text";
import { Bracket } from "./Bracket";
import { Def } from "./Def";
import { Ref } from "./Ref";
import { Foreign } from "./Foreign";
import { Transcr } from "./Transcr";
import { Emph } from "./Emph";
import { Expl } from "./Expl";
import { Trans } from "./Trans";
import { Iron } from "./Iron";
import { Specchar } from "./Specchar";
import { Topic } from "./Topic";
import { Famn } from "./Famn";
import { Title } from "./Title";
import { Transl } from "./Transl";

export function mapElement(element: unknown): JSX.Element | null {
  if (isTrans(element)) {
    return <Trans {...element} />;
  }

  if (isTr(element)) {
    return <TrEntry {...element} />;
  }

  if (isDef(element)) {
    return <Def {...element} />;
  }

  if (isBracket(element)) {
    return <Bracket {...element} />;
  }

  if (isToken(element)) {
    return <Token {...element} />;
  }

  if (isText(element)) {
    return <Text {...element} />;
  }

  if (isRef(element)) {
    return <Ref {...element} />;
  }

  if (isForeign(element)) {
    return <Foreign {...element} />;
  }

  if (isExpl(element)) {
    return <Expl {...element} />;
  }

  if (isEmph(element)) {
    return <Emph {...element} />;
  }

  if (isTranscr(element)) {
    return <Transcr {...element} />;
  }

  if (isIron(element)) {
    return <Iron {...element} />;
  }

  if (isSpecchar(element)) {
    return <Specchar {...element} />;
  }

  if (isTopic(element)) {
    return <Topic {...element} />;
  }

  if (isFamnModel(element)) {
    return <Famn {...element} />;
  }

  if (isTitleModel(element)) {
    return <Title {...element} />;
  }

  if (isTranslModel(element)) {
    return <Transl {...element} />;
  }

  if (typeof element === "string") {
    return <Fragment>{element}</Fragment>;
  }

  if (typeof element === "object" && React.isValidElement(element)) {
    return element;
  }

  return null;
}
