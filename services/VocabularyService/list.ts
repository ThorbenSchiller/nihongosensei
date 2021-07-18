import { execute } from "./connection";
import { EntryModel, EntryWrapperModel, FindOptions } from "./Model";
import { DEFAULT_LIMIT, MAX_LIMIT } from "../constants";

export async function list(options: FindOptions = {}): Promise<EntryModel[]> {
  const { limit = DEFAULT_LIMIT, offset = 0 } = options;
  const results = await execute<EntryWrapperModel>(
    `SELECT * FROM entry LIMIT ?, ?`,
    [offset.toString(), Math.min(limit, MAX_LIMIT).toString()]
  );

  return results.map((result) => result.entry_json);
}
