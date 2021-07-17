import { UsgModel } from "../../services/VocabularyService";
import React from "react";

const USG_MAP: Record<string, string> = {
  coll: "usg.",
  lit: "schriftspr.",
};

export function Usg(usg: UsgModel): JSX.Element | null {
  if (usg.reg) {
    return (
      <span className="text-blue-700 dark:text-blue-300 mr-1 italic">
        {USG_MAP[usg.reg] ?? [usg.reg]}
      </span>
    );
  }

  if (usg.content) {
    return (
      <span
        className="text-green-700 dark:text-green-300 mr-1 italic"
        style={{ fontVariant: "small-caps" }}
      >
        {usg.content}
      </span>
    );
  }

  return null;
}
