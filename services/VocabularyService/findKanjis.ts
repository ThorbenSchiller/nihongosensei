import { execute } from "@services/DatabaseService";
import type { KanjiModel } from "./Model";

/**
 * @param kanjis The kanjis to find.
 * @param executor The executor to use.
 */
export async function findKanjis(
  kanjis: ReadonlyArray<string>,
  executor = execute,
): Promise<KanjiModel[]> {
  return executor<KanjiModel>(
    `SELECT * FROM kanji WHERE kanji IN (${new Array(kanjis.length)
      .fill("?")
      .join(",")})`,
    [...kanjis],
  );
}
