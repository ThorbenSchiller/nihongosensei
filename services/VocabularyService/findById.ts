import { execute } from "./connection";
import { EntryModel, EntryWrapperModel } from "./Model";

/**
 * Finds an EntryModel by the given id.
 * If no model exists, `null` is returned.
 *
 * @param id The id to look for.
 * @param executor The executor to use.
 */
export async function findById(
  id: number,
  executor = execute
): Promise<EntryModel | null> {
  const results = await executor<EntryWrapperModel>(
    `SELECT entry_json FROM entry WHERE id = ?`,
    [id]
  );

  if (results.length) {
    return results[0].entry_json;
  }

  return null;
}
