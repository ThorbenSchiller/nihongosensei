import { NextApiRequest, NextApiResponse } from "next";
import { findById } from "../../../services/VocabularyService";

export default async function handleEntryById(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).end();

    return;
  }
  const id = Number(req.query.id);
  if (!id) {
    res.status(400).end();

    return;
  }

  res.setHeader("Content-Type", "application/json");

  res.status(200).json(await findById(id));
}
