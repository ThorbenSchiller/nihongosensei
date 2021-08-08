import { execute } from "./connection";
import { EntryModel, EntryWrapperModel } from "./Model";

/**
 * Finds EntryModels by the given ids.
 * If no element with the given id exists, it is left
 * in the result list.
 *
 * @param ids The ids to look for.
 * @param executor The executor to use.
 */
export async function findByIds(
  ids: ReadonlyArray<number>,
  executor = execute
): Promise<EntryModel[]> {
  const results = await executor<EntryWrapperModel>(
    `SELECT entry_json FROM entry WHERE id IN (${new Array(ids.length)
      .fill("?")
      .join(",")})`,
    [...ids]
  );

  return results.map((entry) => entry.entry_json);
}
