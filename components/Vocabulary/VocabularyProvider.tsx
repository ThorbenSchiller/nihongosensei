import React, { useEffect, useState } from "react";
import type {
  EntryModel,
  EntryWrapperModel,
} from "../../services/VocabularyService";
import { EntryFull } from "../Entry";
import { Alert, LoadingProgress } from "../ui";

type VocabularyProps = {
  text: string;
  className?: string;
};

export function VocabularyProvider({
  text,
  className = "",
}: VocabularyProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState<EntryModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (text) {
      const perform = async () => {
        const response = await fetch(`/api/entry/byText?text=${text}`);
        const entryJson: EntryWrapperModel = await response.json();
        setEntry(entryJson.entry_json);
        setError(null);
      };

      setLoading(true);
      perform()
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch vocabulary information");
        })
        .finally(() => setLoading(false));
    }
  }, [text]);

  return (
    <div className={className}>
      {loading && <LoadingProgress />}
      {entry && <EntryFull entry={entry} />}
      {error && <Alert type="error">{error}</Alert>}
    </div>
  );
}
