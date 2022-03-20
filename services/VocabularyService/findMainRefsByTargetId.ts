import { execute } from "@services/DatabaseService";
import type { ResolvedEntryRefModel } from "./Model";

/**
 * Finds all refs which have `MAIN` as their {@link RefModel#type}.
 * The related source entry is resolved as well.
 *
 * @param targetId The target id to look for.
 * @param executor The executor to use.
 */
export async function findMainRefsByTargetId(
  targetId: number,
  executor = execute
): Promise<ResolvedEntryRefModel[]> {
  return executor<ResolvedEntryRefModel>(
    `
        SELECT type, subentrytype, entry.entry_json as entry
        FROM entry_ref
        JOIN entry ON entry.id = entry_ref.source_id
        WHERE target_id = ? AND type = 'MAIN'`,
    [targetId]
  );
}
