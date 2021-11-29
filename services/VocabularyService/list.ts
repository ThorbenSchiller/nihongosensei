import { DEFAULT_LIMIT, MAX_LIMIT } from "../constants";
import { execute } from "./connection";
import type { EntryWrapperModel, FindOptions } from "./Model";

export async function list(
  options: FindOptions = {}
): Promise<EntryWrapperModel[]> {
  const { limit = DEFAULT_LIMIT, offset = 0 } = options;

  return execute<EntryWrapperModel>(`SELECT entry_json FROM entry LIMIT ?, ?`, [
    offset.toString(),
    Math.min(limit, MAX_LIMIT).toString(),
  ]);
}
