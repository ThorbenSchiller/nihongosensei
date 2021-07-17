import React from "react";

const READING_REG_EXP = /([<>]|\[.*?]|\s)/g;

export function Reading({ reading }: { reading: string }): JSX.Element {
  return <>{reading.replaceAll(READING_REG_EXP, "")}</>;
}
