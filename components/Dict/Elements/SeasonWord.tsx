import React from "react";
import type {
  SeasonEnum,
  SeasonModel,
} from "../../../services/VocabularyService";

const SEASON_TYPE_MAPPING: Record<SeasonEnum, string> = {
  SPRING: "Frühling",
  SUMMER: "Sommer",
  AUTUMN: "Herbst",
  WINTER: "Winter",
  NEWYEAR: "Neujahr",
};

export function SeasonWord({ type }: SeasonModel): JSX.Element {
  return (
    <span
      className="ml-2 inline-block text-base border border-gray-300 dark:border-gray-700 px-1"
      title="Jahreszeitenwort"
    >
      {SEASON_TYPE_MAPPING[type]}
    </span>
  );
}
