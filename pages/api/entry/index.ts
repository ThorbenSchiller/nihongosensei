import {
  findByQuery,
  parsePaginationParams,
} from "@services/VocabularyService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleEntry(
  { method, query }: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (method !== "GET") {
    res.status(405).end();

    return;
  }
  const searchQuery = query.q;
  const text = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;
  if (!text) {
    res.status(400).end();

    return;
  }
  const options = parsePaginationParams(query);

  res.setHeader("Content-Type", "application/json");

  res.status(200).json(await findByQuery(text, options));
}
