import weighted from "weighted";

/**
 * Returns a random entry from the given entries with the
 * given weights.
 *
 * @param entries
 * @param weights
 */
export function getRandomEntry<T>(
  entries: ReadonlyArray<T>,
  weights?: ReadonlyArray<number>
): T {
  return weighted.select(entries, weights ?? entries.map(() => 1));
}
