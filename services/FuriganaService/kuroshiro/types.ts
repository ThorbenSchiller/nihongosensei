import { IpadicFeatures } from "kuromoji";

export type StringType = "kanji" | "mixed" | "kana" | "others";

export type KuroshiroNotation = {
  surfaceForm: string;
  type: StringType;
  reading?: string;
  pronunciation?: string;
  token: IpadicFeatures;
};

export interface KuroshiroAnalzyer {
  init(): Promise<void>;
  parse(text: string): Promise<IpadicFeatures[]>;
}
