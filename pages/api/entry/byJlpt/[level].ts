import type { NextApiRequest, NextApiResponse } from "next";
import {
  findByJlpt,
  parsePaginationParams,
} from "../../../../services/VocabularyService";

export default async function handleEntryById(
  { query, method }: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (method !== "GET") {
    res.status(405).end();

    return;
  }
  const level = Number(query.level);
  if (!level) {
    res.status(400).end();

    return;
  }
  const options = parsePaginationParams(query);

  res.setHeader("Content-Type", "application/json");

  res.status(200).json(await findByJlpt(level, options));
}
