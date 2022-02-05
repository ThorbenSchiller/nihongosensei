import React, { Fragment, HTMLProps } from "react";
import type {
  ResolvedEntryRefModel,
  SubentryTypeEnum,
} from "../../../services/VocabularyService";
import type { EnhancedTypeEnum } from "./RelatedEntries";
import { RelatedEntry } from "./RelatedEntry";

const ENHANCED_SUBTYPE_MAP: Partial<Record<EnhancedTypeEnum, string>> = {
  DERIVATION: "Ableitung",
  COMPOSITION: "Zusammensetzungen",
  USAGE_EXAMPLE: "Gebrauchsbeispiele",
};

function SubTypeHeading({
  children,
  ...rest
}: Omit<HTMLProps<HTMLDivElement>, "className">): JSX.Element {
  return (
    <div className="mt-2" {...rest}>
      {children}
    </div>
  );
}

const SUBTYPE_MAP: Partial<Record<SubentryTypeEnum, JSX.Element | null>> = {
  HEAD: <SubTypeHeading title="Komponentenanfang">▶</SubTypeHeading>,
  TAIL: <SubTypeHeading title="Komponentenende">◀</SubTypeHeading>,
  VW_BSP: <SubTypeHeading title="Beispiel">◇</SubTypeHeading>,
  W_IDIOM: <SubTypeHeading title="Idiom">★</SubTypeHeading>,
  Z_SPR_W: <SubTypeHeading>Sprichwort</SubTypeHeading>,
  X_SATZ: <SubTypeHeading>Satz</SubTypeHeading>,
};

type RelatedEntryGroupProps = {
  type: EnhancedTypeEnum;
  entries: ReadonlyArray<ResolvedEntryRefModel>;
};

export function RelatedEntryGroup({
  type,
  entries,
}: RelatedEntryGroupProps): JSX.Element {
  const sortedEntries = [...entries].sort(
    ({ subentrytype: first }, { subentrytype: second }) => {
      if (!first) {
        return 1;
      }
      if (!second) {
        return -1;
      }

      return first.localeCompare(second);
    }
  );

  let firstType: SubentryTypeEnum | undefined;

  return (
    <>
      {ENHANCED_SUBTYPE_MAP[type] && (
        <div className="mt-3 mb-2">{ENHANCED_SUBTYPE_MAP[type]}</div>
      )}
      {sortedEntries.map(({ entry, subentrytype }) => {
        let typeHeading: JSX.Element | null = null;
        if (subentrytype && firstType !== subentrytype) {
          typeHeading = SUBTYPE_MAP[subentrytype] ?? null;
        }

        firstType = subentrytype;

        return (
          <Fragment key={entry.id}>
            {typeHeading}
            <RelatedEntry
              className="border-b border-gray-300 dark:border-gray-700 pl-4 py-2"
              entry={entry}
            />
          </Fragment>
        );
      })}
    </>
  );
}
