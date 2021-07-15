import {
  DefModel,
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

export function isDefined<T>(input: T): input is NonNullable<T> {
  return !!input;
}
