import { execute } from "./connection";
import { EntryModel, EntryWrapperModel, FindOptions } from "./Model";
import { DEFAULT_LIMIT, MAX_LIMIT } from "../constants";

export async function findByQuery(
  query: string,
  options: FindOptions = {}
): Promise<EntryModel[]> {
  const { limit = DEFAULT_LIMIT, offset = 0 } = options;
  const results = await execute<EntryWrapperModel>(
    `SELECT * FROM entry
    WHERE
        MATCH(text_plain, hiragana_plain, orths_plain, senses_plain)
        AGAINST (? IN BOOLEAN MODE) LIMIT ?, ?`,
    [`${query}*`, offset, Math.min(limit, MAX_LIMIT)]
  );

  return results.map((result) => result.entry_json);
}
