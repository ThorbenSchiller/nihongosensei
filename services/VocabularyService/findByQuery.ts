import { execute } from "./connection";
import { EntryModel, EntryWrapperModel, FindOptions } from "./Model";
import { DEFAULT_LIMIT, MAX_LIMIT } from "../constants";

const FIND_ENTRIES_QUERY = `
    SELECT *
    FROM entry
    WHERE MATCH(text_plain, hiragana_plain, orths_plain, senses_plain)
                AGAINST(? IN BOOLEAN MODE)
    UNION
    DISTINCT
    SELECT *
    FROM entry
    WHERE text_plain = ?
       OR hiragana_plain = ?
    LIMIT ?, ?`;

const COUNT_ENTRIES_QUERY = `
    SELECT COUNT(e.id) as count
    FROM (
             SELECT id
             FROM entry
             WHERE MATCH(text_plain, hiragana_plain, orths_plain, senses_plain)
                         AGAINST(? IN BOOLEAN MODE)
             UNION
             DISTINCT
             SELECT id
             FROM entry
             WHERE text_plain = ?
                OR hiragana_plain = ?
         ) AS e`;

export async function findByQuery(
  query: string,
  options: FindOptions = {}
): Promise<EntryModel[]> {
  const { limit = DEFAULT_LIMIT, offset = 0 } = options;
  const results = await execute<EntryWrapperModel>(
    FIND_ENTRIES_QUERY,
    // parameters seem to be strings, even for limit @see https://github.com/sidorares/node-mysql2/issues/1239
    [
      query,
      query,
      query,
      offset.toString(),
      Math.min(limit, MAX_LIMIT).toString(),
    ]
  );

  return results.map((result) => result.entry_json);
}

export async function findByQueryCount(query: string): Promise<number> {
  const results = await execute<{ count: number }>(COUNT_ENTRIES_QUERY, [
    query,
    query,
    query,
  ]);

  return results[0].count;
}
