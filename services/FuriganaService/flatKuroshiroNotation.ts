import type { KuroshiroNotation } from "@services/FuriganaService/kuroshiro";
import type { FuriganaModel } from "@services/FuriganaService/Model";

export function flatKuroshiroNotation(
  input: ReadonlyArray<KuroshiroNotation>,
): (FuriganaModel | string)[] {
  let carry: string[] = [];
  const furiganaModels: (FuriganaModel | string)[] = [];
  for (const entry of input) {
    if (entry.type !== "kanji") {
      carry.push(entry.surfaceForm);
      continue;
    }

    if (!entry.reading) {
      continue;
    }

    if (carry.length) {
      furiganaModels.push(carry.join(""));
      carry = [];
    }
    furiganaModels.push({
      text: entry.surfaceForm,
      reading: entry.reading,
      basicForm: entry.token.basic_form,
    });
  }

  if (carry.length) {
    furiganaModels.push(carry.join(""));
  }

  return furiganaModels;
}
