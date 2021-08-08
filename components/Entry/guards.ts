import {
  BracketModel,
  DefModel,
  ElementProvider,
  EmphModel,
  ExplModel,
  FamnModel,
  ForeignModel,
  IronModel,
  RefModel,
  SpeccharModel,
  TextModel,
  TitleModel,
  TokenModel,
  TopicModel,
  TranscrModel,
  TranslModel,
  TransModel,
  TrModel,
} from "../../services/VocabularyService";

export function isElementProvider(input: unknown): input is ElementProvider {
  return typeof input === "object" && input != null && "_element" in input;
}

export function isToken(input: unknown): input is TokenModel {
  return isElementProvider(input) && input._element === "TokenType";
}

export function isText(input: unknown): input is TextModel {
  return isElementProvider(input) && input._element === "TextType";
}

export function isRef(input: unknown): input is RefModel {
  return isElementProvider(input) && input._element === "RefType";
}

export function isTrans(input: unknown): input is TransModel {
  return isElementProvider(input) && input._element === "TransType";
}

export function isDef(input: unknown): input is DefModel {
  return isElementProvider(input) && input._element === "DefType";
}

export function isTr(input: unknown): input is TrModel {
  return isElementProvider(input) && input._element === "TrComplexType";
}

export function isBracket(input: unknown): input is BracketModel {
  return isElementProvider(input) && input._element === "BracketType";
}

export function isForeign(input: unknown): input is ForeignModel {
  return isElementProvider(input) && input._element === "ForeignType";
}

export function isExpl(input: unknown): input is ExplModel {
  return isElementProvider(input) && input._element === "ExplType";
}

export function isTranscr(input: unknown): input is TranscrModel {
  return isElementProvider(input) && input._element === "TranscrType";
}

export function isEmph(input: unknown): input is EmphModel {
  return isElementProvider(input) && input._element === "EmphType";
}

export function isIron(input: unknown): input is IronModel {
  return isElementProvider(input) && input._element === "IronType";
}

export function isSpecchar(input: unknown): input is SpeccharModel {
  return isElementProvider(input) && input._element === "SpeccharType";
}

export function isTopic(input: unknown): input is TopicModel {
  return isElementProvider(input) && input._element === "TopicType";
}

export function isFamnModel(input: unknown): input is FamnModel {
  return isElementProvider(input) && input._element === "FamnType";
}

export function isTitleModel(input: unknown): input is TitleModel {
  return isElementProvider(input) && input._element === "TitleType";
}

export function isTranslModel(input: unknown): input is TranslModel {
  return isElementProvider(input) && input._element === "TranslType";
}

export function isDefined<T>(input: T): input is NonNullable<T> {
  return !!input;
}
