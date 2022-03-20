import { execute, FindOptions } from "@services/DatabaseService";
import { transformOptionsToQuery } from "@services/VocabularyService/helper";
import { MAX_LIMIT } from "../constants";
import type { EntryWrapperModel, VocabularyFindOptions } from "./Model";

export async function findBy({
  limit,
  offset,
  ...options
}: VocabularyFindOptions & FindOptions): Promise<EntryWrapperModel[]> {
  const { where, binds } = transformOptionsToQuery(options);
  const query = `
    SELECT *
    FROM entry
    WHERE 1 AND ${where} LIMIT ?, ?`;

  return execute<EntryWrapperModel>(
    query,
    // parameters seem to be strings, even for limit @see https://github.com/sidorares/node-mysql2/issues/1239
    [...binds, offset.toString(), Math.min(limit, MAX_LIMIT).toString()]
  );
}

export async function findByCount(
  options: VocabularyFindOptions
): Promise<number> {
  const { where, binds } = transformOptionsToQuery(options);
  const query = `
    SELECT COUNT(id) AS count
    FROM entry
    WHERE 1 AND ${where}`;

  const results = await execute<{ count: number }>(query, binds);

  return results[0].count;
}
