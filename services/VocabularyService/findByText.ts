import { execute } from "./connection";
import { EntryModel, EntryWrapperModel } from "./Model";

export async function findByText(text: string): Promise<EntryModel | null> {
  const results = await execute<EntryWrapperModel>(
    `SELECT * FROM entry WHERE text_clean = ? OR hiragana_clean = ?`,
    [text, text]
  );

  if (results.length) {
    return JSON.parse(results[0].entry_json);
  }

  return null;
}
