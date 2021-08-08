import { execute } from "./connection";
import { EntryModel, EntryWrapperModel } from "./Model";

export async function findByText(text: string): Promise<EntryModel | null> {
  const results = await execute<EntryWrapperModel>(
    `
        SELECT
            entry.entry_json
        FROM entry_map
        JOIN entry ON entry.id = entry_map.entry_id
        WHERE
            entry_map.text = ?
        LIMIT 1`,
    [text, text]
  );

  if (results.length) {
    return results[0].entry_json;
  }

  return null;
}
