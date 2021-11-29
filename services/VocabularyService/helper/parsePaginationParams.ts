import type { FindOptions } from "../Model";

/**
 * Parses pagination params from the given record.
 *
 * @param params The params to parse from.
 */
export function parsePaginationParams(
  params: Record<string, string | string[]>
): FindOptions {
  const paginationParams: FindOptions = {};
  const { offset: offsetString, limit: limitString } = params;
  const offset = Number(offsetString) ?? 0;
  if (!isNaN(offset)) {
    paginationParams.offset = offset;
  }
  const limit = Number(limitString);
  if (!isNaN(limit)) {
    paginationParams.limit = limit;
  }

  return paginationParams;
}
