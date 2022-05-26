import { MAX_LIMIT } from "@services/constants";
import { execute, FindOptions } from "@services/DatabaseService";
import type { EntryWrapperModel } from "./Model";

export async function list({
  limit,
  offset,
}: FindOptions): Promise<EntryWrapperModel[]> {
  return execute<EntryWrapperModel>(`SELECT entry_json FROM entry LIMIT ?, ?`, [
    offset.toString(),
    Math.min(limit, MAX_LIMIT).toString(),
  ]);
}
