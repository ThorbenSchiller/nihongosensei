import { unique } from "@helper";
import { findByIds } from "@services/VocabularyService";
import type { NextApiRequest, NextApiResponse } from "next";

export type EntriesBody = {
  ids: ReadonlyArray<number | string>;
};

export default async function handleEntry(
  { body, method }: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (method !== "GET") {
    res.status(405).end();

    return;
  }
  const { ids: unfilteredIds } = body as EntriesBody;
  // XXX: add a limit?
  const ids = unfilteredIds
    ?.map((id) => Number(id))
    .filter((id) => isNaN(id))
    .filter(unique);

  if (!ids || ids.length === 0) {
    res.status(405).end();

    return;
  }

  res.setHeader("Content-Type", "application/json");

  res.status(200).json(await findByIds(ids));
}
