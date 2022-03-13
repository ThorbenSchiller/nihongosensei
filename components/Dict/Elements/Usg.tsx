import type { UsgModel, UsgTypeEnum } from "@services/VocabularyService";
import clsx from "clsx";
import React from "react";

const USG_MAP: Record<string, string> = {
  coll: "usg.",
  lit: "schriftspr.",
};

const COLOR_MAP: Partial<Record<UsgTypeEnum, string>> = {
  TIME: "text-blue-700 dark:text-blue-300",
  HINT: "text-red-700 dark:text-red-300",
};
const DEFAULT_COLOR = "text-green-700 dark:text-green-300";

const STYLE_MAP: Partial<Record<UsgTypeEnum, React.CSSProperties>> = {
  TIME: {},
};
const DEFAULT_STYLE: React.CSSProperties = { fontVariant: "small-caps" };

export function Usg({
  reg,
  type = "UNKNOWN",
  content,
}: UsgModel): JSX.Element | null {
  if (reg) {
    return (
      <span className="text-blue-700 dark:text-blue-300 italic">
        {USG_MAP[reg] ?? [reg]}
      </span>
    );
  }

  if (content) {
    return (
      <span
        className={clsx(COLOR_MAP[type] ?? DEFAULT_COLOR, "italic")}
        style={STYLE_MAP[type] ?? DEFAULT_STYLE}
      >
        {content}
      </span>
    );
  }

  return null;
}
