import React from "react";

const READING_REG_EXP = /([/<>]|\[.*?]|\s)/g;

type ReadingProps = {
  reading: string;
};

export function Reading({ reading }: ReadingProps): JSX.Element {
  return <>{reading.replaceAll(READING_REG_EXP, "")}</>;
}
