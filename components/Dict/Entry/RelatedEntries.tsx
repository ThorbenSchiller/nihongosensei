import type {
  ResolvedEntryRefModel,
  SubentryTypeEnum,
} from "@services/VocabularyService";
import type { JSX } from "react";
import { RelatedEntryGroup } from "./RelatedEntryGroup";

type RelatedEntriesProps = {
  entries: ResolvedEntryRefModel[];
  className?: string;
};

export type EnhancedTypeEnum =
  | SubentryTypeEnum
  | "DERIVATION"
  | "COMPOSITION"
  | "USAGE_EXAMPLE";

type GroupBySubTypeMap = Partial<
  Record<EnhancedTypeEnum, ResolvedEntryRefModel[]>
>;

function groupByType(
  refs: ReadonlyArray<ResolvedEntryRefModel>,
): GroupBySubTypeMap {
  return refs.reduce((collector, relationModel) => {
    const { subentrytype } = relationModel;
    if (!subentrytype) {
      return collector;
    }
    let mappedTyped: EnhancedTypeEnum = subentrytype;
    if (DERIVATIONS.includes(subentrytype)) {
      mappedTyped = "DERIVATION";
    } else if (COMPOSITIONS.includes(subentrytype)) {
      mappedTyped = "COMPOSITION";
    } else if (USAGE_EXAMPLES.includes(subentrytype)) {
      mappedTyped = "USAGE_EXAMPLE";
    }

    return {
      ...collector,
      [mappedTyped]: [...(collector[mappedTyped] ?? []), relationModel],
    };
  }, {} as GroupBySubTypeMap);
}

const DERIVATIONS: SubentryTypeEnum[] = [
  "SA",
  "SURU",
  "SASERU",
  "SHITA",
  "SHITE",
  "TEKI",
  "TO",
  "TARU",
  "NA",
  "NI",
  "NO",
  "DA",
  "DE",
  "E",
  "O",
  "KARA",
  "GARU",
  "GE",
  "KU",
  "MI",
];

const COMPOSITIONS: SubentryTypeEnum[] = ["HEAD", "TAIL"];

const USAGE_EXAMPLES: SubentryTypeEnum[] = [
  "W_IDIOM",
  "VW_BSP",
  "Z_SPR_W",
  "X_SATZ",
];

function sortGroups<T, TEntry extends [key: string, value: T]>(
  first: TEntry,
  second: TEntry,
) {
  return first[0].localeCompare(second[0]);
}

export function RelatedEntries({
  entries,
  className,
}: RelatedEntriesProps): JSX.Element | null {
  if (!entries.length) {
    return null;
  }

  const groups = groupByType(entries);

  return (
    <div className={className}>
      <h2 className="text-2xl">Verwandte Einträge</h2>
      {Object.entries(groups)
        .sort(sortGroups)
        .map(([type, entries]) => (
          <RelatedEntryGroup
            key={type}
            type={type as EnhancedTypeEnum}
            entries={entries}
          />
        ))}
    </div>
  );
}
