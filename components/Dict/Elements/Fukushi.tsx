import type {
  FukushiModel,
  TransitivityEnum,
} from "@services/VocabularyService";

// XXX: resolve duplicated code with Doushi
const TRANSITIVITY_MAP: Record<TransitivityEnum, string> = {
  TRANS: "trans.",
  INTRANS: "intransitiv",
  BOTH: "intransitiv oder transitiv",
};

export function Fukushi({ suru, ni, to, taru }: FukushiModel): JSX.Element {
  return (
    <>
      Adverb
      {ni && (
        <>
          {" "}
          <em>ni</em> Adn. mit <em>naru</em>
        </>
      )}
      {to && (
        <>
          {" "}
          mit <em>to</em>
        </>
      )}
      {taru && (
        <>
          {" "}
          mit <em>to</em> Adn. mit <em>taru</em>
        </>
      )}
      {suru && (
        <>
          {" "}
          mit <em>suru</em> {TRANSITIVITY_MAP[suru]} V.
        </>
      )}
    </>
  );
}
