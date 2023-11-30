import type { GramGrpModel } from "@services/VocabularyService";
import { joinBy, setKeyProperty } from "../helper";
import { Doushi } from "./Doushi";
import { Fukushi } from "./Fukushi";
import { Keiyoudoushi } from "./Keiyoudoushi";
import { isDefined } from "./helper/guards";

export function GramGrp({
  doushi,
  meishi,
  jodoushi,
  joshi,
  fukushi,
  keiyoushi,
  keiyoudoushi,
  kandoushi,
  prefix,
  suffix,
  rentaishi,
  setsuzokushi,
  daimeishi,
  setsuzokujoshi,
  shuujoshi,
  kakarijoshi,
  kakujoshi,
  fukujoshi,
  wordcomponent,
  specialcharacter,
  kanji,
  rengo,
}: GramGrpModel): JSX.Element {
  const parts = [
    prefix && <>Präfix</>,
    suffix && <>Suffix</>,
    rentaishi && <>Adnomen</>,
    setsuzokujoshi && <>konjunktionale Partikel</>,
    daimeishi && <>Pronomen</>,
    kandoushi && <>Interjektion</>,
    jodoushi && <>Hilfsverb.</>,
    joshi && <>Partikel</>,
    fukujoshi && <>adverbial Partikel</>,
    kakarijoshi && <>Themapartikel</>,
    kakujoshi && <>Kasuspartikel</>,
    setsuzokushi && <>Konjunktionalpartikel</>,
    shuujoshi && <>satzbeendende Partikel</>,
    wordcomponent && <>Wortkomponente</>,
    specialcharacter && <>Sonderzeichen</>,
    rengo && <>Zusammensetzung</>,
    kanji && <>Kanji</>,

    meishi && <>Nomen</>,
    fukushi && <Fukushi {...fukushi} />,
    keiyoushi && (
      <>
        Adjektiv
        {keiyoushi.ku && (
          <>
            {" "}
            auf <em>-ku</em>
          </>
        )}
        {keiyoushi.shiku && (
          <>
            {" "}
            auf <em>-shiku</em>
          </>
        )}
      </>
    ),
    keiyoudoushi && <Keiyoudoushi {...keiyoudoushi} />,
  ]
    .filter(isDefined)
    .map(setKeyProperty())
    .reduce(joinBy("; "), []);

  return (
    <>
      {parts}
      {doushi
        ?.map((doushiEntry, index) => <Doushi key={index} {...doushiEntry} />)
        .reduce(joinBy("; "), [])}
    </>
  );
}
