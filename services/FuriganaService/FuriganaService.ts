import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import { Kuroshiro, KuroshiroNotation } from "./kuroshiro";
import type { FuriganaModel } from "./Model";

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

const DEFAULT_ANALYZER_FACTORY: () => KuromojiAnalyzer = () =>
  new KuromojiAnalyzer();

/**
 * Services for converting a given text into a {@link FuriganaModel}.
 */
export class FuriganaService {
  private initialized = false;
  private static instance: FuriganaService;

  public constructor(
    private readonly kuroshiro: Kuroshiro = new Kuroshiro(),
    private readonly analyzerFactory = DEFAULT_ANALYZER_FACTORY
  ) {}

  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Converts the given text to {@link FuriganaModel}s.
   *
   * @param text The text to convert.
   */
  public async getFurigana(text: string): Promise<FuriganaModel[]> {
    await this.initialize();

    const converted = await this.kuroshiro.convert(text);

    return converted.map(createFuriganaModel);
  }

  public static getInstance(): FuriganaService {
    if (!this.instance) {
      this.instance = new FuriganaService();
    }

    return this.instance;
  }

  private async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    await this.kuroshiro.init(this.analyzerFactory());

    this.initialized = true;
  }
}
