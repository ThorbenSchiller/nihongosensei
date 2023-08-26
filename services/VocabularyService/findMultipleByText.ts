import { execute } from "@services/DatabaseService";
import type { EntryWrapperModel } from "./Model";

type FindByTextOptions = {
  limit?: number;
};

export async function findMultipleByText(
  text: string,
  options: FindByTextOptions = {}
): Promise<EntryWrapperModel[]> {
  const { limit = 1 } = options;
  return execute<EntryWrapperModel>(
    `
        SELECT
            entry.*
        FROM entry_map
        JOIN entry ON entry.id = entry_map.entry_id
        WHERE
            entry_map.text = ?
        LIMIT ?`,
    [text, limit.toString()]
  );
}
