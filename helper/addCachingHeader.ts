import type { ServerResponse } from "http";

type CachingHeaderOptions = {
  maxAgeInSeconds?: number;
  staleAgeInSeconds?: number;
};

const DEFAULT_MAX_AGE = 604800; // 7 day
const DEFAULT_STALE_MAX_AGE = 86400; // 1 day

export function addCachingHeader(
  res: ServerResponse,
  {
    maxAgeInSeconds = DEFAULT_MAX_AGE,
    staleAgeInSeconds = DEFAULT_STALE_MAX_AGE,
  }: CachingHeaderOptions = {},
): void {
  res.setHeader(
    "Cache-Control",
    `public, max-age=${maxAgeInSeconds}, stale-while-revalidate=${staleAgeInSeconds}`,
  );
}
