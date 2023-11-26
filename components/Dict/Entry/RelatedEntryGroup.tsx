import { Heading } from "@components/ui";
import type {
  EntryModel,
  ResolvedEntryRefModel,
  SubentryTypeEnum,
} from "@services/VocabularyService";
import { Fragment, HTMLProps, JSX } from "react";
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
    <Heading level={4} className="my-2" {...rest}>
      {children}
    </Heading>
  );
}

const SUBTYPE_MAP: Partial<Record<SubentryTypeEnum, JSX.Element | null>> = {
  HEAD: <SubTypeHeading>Komponentenanfang</SubTypeHeading>,
  TAIL: <SubTypeHeading>Komponentenende</SubTypeHeading>,
  VW_BSP: <SubTypeHeading>Beispiel</SubTypeHeading>,
  W_IDIOM: <SubTypeHeading>Idiom</SubTypeHeading>,
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

  const groupByType: Record<SubentryTypeEnum | "default", EntryModel[]> =
    sortedEntries.reduce((collector, { entry, subentrytype }) => {
      const type = subentrytype ?? "default";

      collector[type] ??= [];
      collector[type].push(entry);

      return collector;
    }, {} as Record<SubentryTypeEnum | "default", EntryModel[]>);

  return (
    <>
      {ENHANCED_SUBTYPE_MAP[type] && (
        <Heading level={3} className="mt-3 mb-2">
          {ENHANCED_SUBTYPE_MAP[type]}
        </Heading>
      )}
      {Object.entries(groupByType).map(([subentrytype, entries]) => (
        <Fragment key={subentrytype}>
          {SUBTYPE_MAP[subentrytype as SubentryTypeEnum]}
          <ol className="list-decimal list-inside">
            {entries.map((entry) => (
              <RelatedEntry key={entry.id} entry={entry} />
            ))}
          </ol>
        </Fragment>
      ))}
    </>
  );
}
