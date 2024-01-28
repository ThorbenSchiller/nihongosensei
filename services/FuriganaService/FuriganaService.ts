import { flatKuroshiroNotation } from "@services/FuriganaService/flatKuroshiroNotation";
import { KuromojiAnalyzer } from "./KuromojiAnalyzer";
import type { FuriganaModel } from "./Model";
import { Kuroshiro } from "./kuroshiro";

/**
 * Service for converting a given text into a {@link FuriganaModel}.
 */
export class FuriganaService {
  private static instance: FuriganaService;

  public constructor(
    private readonly kuroshiro: Kuroshiro = new Kuroshiro(
      new KuromojiAnalyzer(),
    ),
  ) {}

  /**
   * Converts the given text to {@link FuriganaModel}s.
   *
   * @param text The text to convert.
   */
  public async getFurigana(text: string): Promise<(FuriganaModel | string)[]> {
    const converted = await this.kuroshiro.convert(text);

    return flatKuroshiroNotation(converted);
  }

  public static getInstance(): FuriganaService {
    if (!this.instance) {
      this.instance = new FuriganaService();
    }

    return this.instance;
  }
}
