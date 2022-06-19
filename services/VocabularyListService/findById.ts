import { execute } from "@services/DatabaseService";
import type { VocabularyListModel } from "./Model";

export async function findById(
  id: number,
  executor = execute
): Promise<VocabularyListModel | null> {
  const [result] = await executor<VocabularyListModel>(
    `SELECT * FROM entry_list WHERE id = ?`,
    [id]
  );

  return result ?? null;
}
