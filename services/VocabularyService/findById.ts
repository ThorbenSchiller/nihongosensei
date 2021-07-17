import { execute } from "./connection";
import { EntryModel, EntryWrapperModel } from "./Model";

export async function findById(id: number): Promise<EntryModel | null> {
  const results = await execute<EntryWrapperModel>(
    `SELECT * FROM entry WHERE id = ?`,
    [id]
  );

  if (results.length) {
    return results[0].entry_json;
  }

  return null;
}
