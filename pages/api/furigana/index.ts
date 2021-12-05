import { NextApiRequest, NextApiResponse } from "next";
import {
  FuriganaModel,
  FuriganaService,
} from "../../../services/FuriganaService";

export type FuriganaResponse = {
  furigana: FuriganaModel[];
};

const furiganaService = FuriganaService.getInstance();

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).end();

    return;
  }
  const input = req.body?.trim();
  const furigana = input ? await furiganaService.getFurigana(input) : null;

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    furigana,
  } as FuriganaResponse);
}
