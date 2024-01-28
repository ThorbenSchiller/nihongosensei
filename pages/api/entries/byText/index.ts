import { unique } from "@helper";
import { EntryWrapperModel } from "@services/VocabularyService";
import { findMultipleByText } from "@services/VocabularyService/findMultipleByText";
import type { NextApiRequest, NextApiResponse } from "next";

export type EntriesByTextBody = {
  text: ReadonlyArray<string>;
  limit?: number;
};

export type EntriesByTextResponse = Record<string, EntryWrapperModel[]>;

export default async function handleEntryByText(
  { method, body }: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (method !== "POST") {
    res.status(405).end();

    return;
  }

  const { text: unfilteredText, limit = 10 } = body as EntriesByTextBody;
  // XXX: add a limit?
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const text = unfilteredText?.filter((text) => !!text).filter(unique);

  if (!text || text.length === 0) {
    res.status(400).json({
      error: "text array can not be empty or contains invalid entries",
    });

    return;
  }

  const parsedLimit = Math.min(Math.abs(Number(limit)) || 10, 10);

  const entries = await Promise.all(
    text.map(async (text) => [
      text,
      await findMultipleByText(text, {
        limit: parsedLimit,
      }),
    ]),
  );
  const byTextMap = Object.fromEntries(
    entries as [string, EntryWrapperModel[]][],
  );

  res.setHeader("Content-Type", "application/json");

  res.status(200).json(byTextMap);
}
