import { EntryFull } from "@components/Dict";
import { Alert, Button, LoadingProgress } from "@components/ui";
import ExternalIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import type {
  EntryModel,
  EntryWrapperModel,
} from "@services/VocabularyService";
import { useEffect, useState } from "react";

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
      {entry && (
        <>
          <EntryFull
            entry={entry}
            className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded"
          />
          <Button
            as="a"
            href={`/entry/${entry.id}`}
            variant="default"
            target="_blank"
            className="inline-flex items-center"
          >
            Im Wörterbuch anzeigen
            <ExternalIcon className="ml-1 w-4 h-4" />
          </Button>
        </>
      )}
      {error && <Alert type="error">{error}</Alert>}
    </div>
  );
}
