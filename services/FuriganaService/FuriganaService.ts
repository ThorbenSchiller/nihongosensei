import { KuromojiAnalyzer } from "./KuromojiAnalyzer";
import type { FuriganaModel } from "./Model";
import { Kuroshiro, type KuroshiroNotation } from "./kuroshiro";

function createFuriganaModel({
  surfaceForm,
  type,
  reading,
  token,
}: KuroshiroNotation): FuriganaModel {
  return {
    text: surfaceForm,
    reading: type === "kanji" ? reading : null,
    basicForm: type === "kanji" ? token?.basic_form ?? null : null,
  };
}

/**
 * Service for converting a given text into a {@link FuriganaModel}.
 */
export class FuriganaService {
  private static instance: FuriganaService;

  public constructor(
    private readonly kuroshiro: Kuroshiro = new Kuroshiro(
      new KuromojiAnalyzer()
    )
  ) {}

  /**
   * Converts the given text to {@link FuriganaModel}s.
   *
   * @param text The text to convert.
   */
  public async getFurigana(text: string): Promise<FuriganaModel[]> {
    const converted = await this.kuroshiro.convert(text);

    return converted.map(createFuriganaModel);
  }

  public static getInstance(): FuriganaService {
    if (!this.instance) {
      this.instance = new FuriganaService();
    }

    return this.instance;
  }
}
