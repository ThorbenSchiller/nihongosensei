import { execute } from "./connection";
import { EntryModel, EntryWrapperModel } from "./Model";

export async function findByText(text: string): Promise<EntryModel | null> {
  const results = await execute<EntryWrapperModel>(
    `SELECT * FROM entry WHERE text_plain = ? OR hiragana_plain = ?`,
    [text, text]
  );

  if (results.length) {
    return results[0].entry_json;
  }

  return null;
}
