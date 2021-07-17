import { OrthModel, OrthTypes } from "../../services/VocabularyService";
import React from "react";
import { MinorText } from "./MinorText";
import { PreferredText } from "./PreferredText";
import styles from "./OtherReadings.module.css";

type OtherReadingsProps = {
  orth: OrthModel[];
};

const READING_MAP: Record<OrthTypes, string | null> = {
  IRREG: "irregulär",
  READ: null,
  LONG: null,
  MISTAKE: "fehlerhaft",
};

export function OtherReadings({
  orth,
}: OtherReadingsProps): JSX.Element | null {
  const hasMidashigo = orth.some((orthEntry) => orthEntry.midashigo);
  if (!hasMidashigo && orth.length === 1) {
    return null;
  }

  const otherReadings = orth.filter((orthEntry) => !orthEntry.midashigo);

  return (
    <div className="mt-2">
      Andere Lesungen:{" "}
      <ul className="inline">
        {otherReadings.map((orthEntry, index) => (
          <li key={index} lang="ja" className={styles.otherReading}>
            <PreferredText text={orthEntry.value} />
            {orthEntry.midashigo && <MinorText> (見出し語)</MinorText>}
            {orthEntry.type && READING_MAP[orthEntry.type] && (
              <MinorText> ({READING_MAP[orthEntry.type]})</MinorText>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
