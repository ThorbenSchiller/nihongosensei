import kuromoji, { type IpadicFeatures, type Tokenizer } from "kuromoji";
import { resolve } from "node:path";
import type { KuroshioAnalyzer } from "./kuroshiro";

type KuroshiroAnalyzerOptions = {
  dictPath?: string;
};

export class KuromojiAnalyzer implements KuroshioAnalyzer {
  private analyzerPromise?: Promise<Tokenizer<IpadicFeatures>>;
  private readonly dictPath: string;

  constructor({ dictPath }: KuroshiroAnalyzerOptions = {}) {
    this.dictPath =
      dictPath ?? resolve(process.cwd(), "node_modules/kuromoji/dict/");
  }

  public async parse(text: string): Promise<IpadicFeatures[]> {
    if (text.trim() === "") {
      return [];
    }
    const analyzer = await this.getAnalyzer();

    return analyzer.tokenize(text);
  }

  private getAnalyzer(): Promise<Tokenizer<IpadicFeatures>> {
    if (!this.analyzerPromise) {
      this.analyzerPromise = new Promise((resolve, reject) => {
        kuromoji
          .builder({
            dicPath: this.dictPath,
          })
          .build((err, analyzer) => {
            if (err) {
              return reject(err);
            }
            resolve(analyzer);
          });
      });
    }

    return this.analyzerPromise;
  }
}
