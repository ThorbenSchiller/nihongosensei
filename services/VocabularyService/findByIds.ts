import { execute } from "./connection";
import { EntryModel, EntryWrapperModel } from "./Model";

export async function findByIds(
  ids: ReadonlyArray<number>
): Promise<EntryModel[]> {
  const results = await execute<EntryWrapperModel>(
    `SELECT * FROM entry WHERE id IN (${new Array(ids.length)
      .fill("?")
      .join(",")})`,
    [...ids]
  );

  return results.map((entry) => entry.entry_json);
}
