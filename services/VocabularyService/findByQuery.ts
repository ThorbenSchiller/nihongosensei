import { execute } from "./connection";
import { EntryWrapperModel, FindOptions } from "./Model";
import { DEFAULT_LIMIT, MAX_LIMIT } from "../constants";

const FIND_ENTRIES_QUERY = `
    SELECT entry.*
    FROM entry_map
             JOIN entry on entry_map.entry_id = entry.id
    WHERE text = ?
    UNION
    DISTINCT
    SELECT entry.*
    FROM entry_map
             JOIN entry on entry_map.entry_id = entry.id
    WHERE MATCH(text) AGAINST(? IN BOOLEAN MODE)
    LIMIT ?, ?`;

const COUNT_ENTRIES_QUERY = `
    SELECT COUNT(e.id) AS count
    FROM (
             SELECT entry_id AS id
             FROM entry_map
             WHERE MATCH(text) AGAINST(? IN BOOLEAN MODE)
             UNION
             DISTINCT
             SELECT entry_id AS id
             FROM entry_map
             WHERE text = ?
         ) AS e`;

export async function findByQuery(
  query: string,
  options: FindOptions = {}
): Promise<EntryWrapperModel[]> {
  const { limit = DEFAULT_LIMIT, offset = 0 } = options;

  return execute<EntryWrapperModel>(
    FIND_ENTRIES_QUERY,
    // parameters seem to be strings, even for limit @see https://github.com/sidorares/node-mysql2/issues/1239
    [query, query, offset.toString(), Math.min(limit, MAX_LIMIT).toString()]
  );
}

export async function findByQueryCount(query: string): Promise<number> {
  const [result] = await execute<{ count: number }>(COUNT_ENTRIES_QUERY, [
    query,
    query,
  ]);

  return result.count;
}
