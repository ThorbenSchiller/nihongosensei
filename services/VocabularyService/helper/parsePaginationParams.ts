import { FindOptions } from "../index";

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
