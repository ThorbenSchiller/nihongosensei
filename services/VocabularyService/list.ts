import { execute } from "./connection";
import { EntryModel, EntryWrapperModel, FindOptions } from "./Model";

const MAX_LIMIT = 15;

export async function list(options: FindOptions = {}): Promise<EntryModel[]> {
  const { limit = 15, offset = 0 } = options;
  const results = await execute<EntryWrapperModel>(
    `SELECT * FROM entry LIMIT ?, ?`,
    [offset, Math.max(limit, MAX_LIMIT)]
  );

  return results.map((result) => result.entry_json);
}
