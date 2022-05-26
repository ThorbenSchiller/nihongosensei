import type { IDProviderModel } from "@services/DatabaseService";

export type VocabularyListModel = IDProviderModel & {
  name: string;
  /**
   * The user id this test belongs to.
   */
  userId: string;
  /**
   * The entry ids used for this test.
   */
  entryIds: ReadonlyArray<number>;
};
