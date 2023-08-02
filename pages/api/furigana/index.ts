import { parseError } from "@helper";
import { FuriganaModel, FuriganaService } from "@services/FuriganaService";
import { NextApiRequest, NextApiResponse } from "next";

export type FuriganaResponse = {
  furigana: FuriganaModel[];
};

const furiganaService = FuriganaService.getInstance();

async function handleFurigana(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).end();

    return;
  }
  const input = req.body as unknown;
  if (typeof input !== "string") {
    res.status(400).end();

    return;
  }
  const trimmedInput = input.trim();

  try {
    const furigana = trimmedInput
      ? await furiganaService.getFurigana(trimmedInput)
      : null;

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      furigana,
    } as FuriganaResponse);
  } catch (e) {
    console.error(e);

    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      error: parseError(e),
    });
  }
}

export default handleFurigana;
