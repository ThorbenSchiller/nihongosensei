/**
 * @see https://github.com/hexenq/kuroshiro-analyzer-kuromoji
 */
declare module "kuroshiro-analyzer-kuromoji" {
  import { IpadicFeatures } from "kuromoji";

  interface KuromojiAnalyzerOptions {
    dictPath?: string;
  }

  class KuromojiAnalyzer {
    constructor(options?: KuromojiAnalyzerOptions);
    init(): Promise<void>;
    parse(text: string): Promise<IpadicFeatures[]>;
  }

  export default KuromojiAnalyzer;
}
