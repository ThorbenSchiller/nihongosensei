import { DEFAULT_LIMIT, MAX_LIMIT } from "../constants";
import { execute } from "./connection";
import type { EntryWrapperModel, FindOptions } from "./Model";

const FIND_ENTRIES_QUERY = `
    SELECT *
    FROM entry
    WHERE jlpt = ?
    LIMIT ?, ?`;

const COUNT_ENTRIES_QUERY = `
    SELECT COUNT(entry.id) AS count
    FROM entry
    WHERE jlpt = ?`;

export async function findByJlpt(
  level: number,
  options: FindOptions = {}
): Promise<EntryWrapperModel[]> {
  const { limit = DEFAULT_LIMIT, offset = 0 } = options;

  return execute<EntryWrapperModel>(
    FIND_ENTRIES_QUERY,
    // parameters seem to be strings, even for limit @see https://github.com/sidorares/node-mysql2/issues/1239
    [level, offset.toString(), Math.min(limit, MAX_LIMIT).toString()]
  );
}

export async function findByJlptCount(level: number): Promise<number> {
  const results = await execute<{ count: number }>(COUNT_ENTRIES_QUERY, [
    level.toString(),
  ]);

  return results[0].count;
}
