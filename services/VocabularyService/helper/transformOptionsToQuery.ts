import type { VocabularyFindOptions } from "../Model";

export function transformOptionsToQuery(options: VocabularyFindOptions): {
  where: string;
  binds: (number | boolean | string)[];
} {
  const where = [];
  const binds: (number | boolean | string)[] = [];

  if (options.jlpt) {
    where.push(`jlpt = ?`);
    binds.push(options.jlpt);
  }
  if (options.ids) {
    where.push(`id IN (${new Array(options.ids.length).fill("?").join(",")})`);
    binds.push(...options.ids);
  }

  return {
    where: where.join(" AND "),
    binds,
  };
}
