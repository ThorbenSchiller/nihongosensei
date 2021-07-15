import { NextApiRequest, NextApiResponse } from "next";
import { findByQuery } from "../../../services/VocabularyService";

export default async function handleEntry(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).end();

    return;
  }
  const searchQuery = req.query.q;
  const text = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;
  if (!text) {
    res.status(400).end();

    return;
  }

  res.setHeader("Content-Type", "application/json");

  res.status(200).json(await findByQuery(text));
}
