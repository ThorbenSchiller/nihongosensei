import { execute } from "./connection";
import type { EntryWrapperModel } from "./Model";

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
): Promise<EntryWrapperModel | null> {
  const [result] = await executor<EntryWrapperModel>(
    `SELECT * FROM entry WHERE id = ?`,
    [id]
  );

  return result ?? null;
}
