import { NextApiRequest, NextApiResponse } from "next";
import { parseError } from "../../../helper/parseError";
import {
  FuriganaModel,
  FuriganaService,
} from "../../../services/FuriganaService";

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
  const input = req.body?.trim();
  let furigana;
  try {
    furigana = input ? await furiganaService.getFurigana(input) : null;
  } catch (e) {
    console.error(e);

    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      error: parseError(e),
    });

    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    furigana,
  } as FuriganaResponse);
}

export default handleFurigana;
