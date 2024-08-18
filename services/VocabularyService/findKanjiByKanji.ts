import { execute } from "@services/DatabaseService";
import type { KanjiModel } from "./Model";

/**
 * Finds an KanjiModel by the given kanji.
 * If no model exists, `null` is returned.
 *
 * @param kanji The kanji to look for.
 * @param executor The executor to use.
 */
export async function findKanjiByKanji(
  kanji: string,
  executor = execute,
): Promise<KanjiModel | null> {
  const [result] = await executor<KanjiModel>(
    `SELECT * FROM kanji WHERE kanji = ?`,
    [kanji],
  );

  return result ?? null;
}
