import { EntryListItem } from "@components/Dict";
import { Pagination } from "@components/Pagination";
import { Alert, MinorText } from "@components/ui";
import { FindOptions } from "@services/DatabaseService";
import { EntryWrapperModel } from "@services/VocabularyService";
import React from "react";

export type EntriesContainerProps = {
  options: FindOptions;
  results: EntryWrapperModel[] | null;
  count: number | null;
  error: string | null;
};

export function EntriesContainer({
  results,
  count,
  options: { offset, limit },
  error,
}: EntriesContainerProps) {
  return (
    <>
      {error && (
        <Alert type="error">
          <p>Ein Fehler ist aufgetreten:</p>
          <code>{error}</code>
        </Alert>
      )}
      {count === 0 && <Alert type="info">Keine Ergebnisse gefunden.</Alert>}
      {results && count != null && count > 0 && (
        <>
          <MinorText className="mb-5" component="div">
            <b>{count}</b> Ergebnisse.
          </MinorText>
          <div>
            {results.map(({ entry_json }) => (
              <EntryListItem
                key={entry_json.id}
                entry={entry_json}
                className="mb-3"
              />
            ))}
          </div>
          <Pagination offset={offset} limit={limit} count={count} />
        </>
      )}
    </>
  );
}
