import {
  BracketModel,
  DefModel,
  ForeignModel,
  RefModel,
  TextModel,
  TokenModel,
  TransModel,
  TrModel,
} from "../../services/VocabularyService";

export function isToken(input: unknown): input is TokenModel {
  return typeof input === "object" && input != null && "content" in input;
}

export function isText(input: unknown): input is TextModel {
  return typeof input === "object" && input != null && "value" in input;
}

export function isRef(input: unknown): input is RefModel {
  return (
    typeof input === "object" &&
    input != null &&
    "id" in input &&
    "type" in input
  );
}

export function isTrans(input: unknown): input is TransModel {
  return (
    typeof input === "object" && input != null && "usgAndTrAndDef" in input
  );
}

export function isDef(input: unknown): input is DefModel {
  return (
    typeof input === "object" &&
    input != null &&
    "textAndLiteralAndTransl" in input
  );
}

export function isTr(input: unknown): input is TrModel {
  return (
    typeof input === "object" && input != null && "textAndTokenAndDef" in input
  );
}

export function isBracket(input: unknown): input is BracketModel {
  return (
    typeof input === "object" &&
    input != null &&
    "defAndExplAndBirthdeath" in input
  );
}

export function isForeign(input: unknown): input is ForeignModel {
  return typeof input === "object" && input != null && "textAndEmph" in input;
}

export function isDefined<T>(input: T): input is NonNullable<T> {
  return !!input;
}
