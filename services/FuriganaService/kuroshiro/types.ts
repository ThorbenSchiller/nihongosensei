import { IpadicFeatures } from "kuromoji";

export type StringType = "kanji" | "mixed" | "kana" | "others";

export type KuroshiroNotation = {
  surfaceForm: string;
  type: StringType;
  reading?: string;
  pronunciation?: string;
  token: IpadicFeatures;
};

export interface KuroshioAnalyzer {
  parse(text: string): Promise<IpadicFeatures[]>;
}
