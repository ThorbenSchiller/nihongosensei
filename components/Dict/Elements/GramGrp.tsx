import type {
  DoushiModel,
  FukushiModel,
  GodanrowEnum,
  GramGrpModel,
  KeiyoudoushiModel,
  LevelEnum,
  TransitivityEnum,
} from "@services/VocabularyService";
import { joinBy, setKeyProperty } from "../helper";
import { isDefined } from "./helper/guards";

const GOUDAN_MAP: Record<GodanrowEnum, JSX.Element> = {
  ka_i_yu: (
    <>
      auf <em>‑ka</em> mit Geminaten-Onbin = <em>‑tte{">"}</em>
    </>
  ),
  ra: (
    <>
      auf <em>‑ra</em> mit regelm. Geminaten-Onbin = <em>‑tte{">"}</em>
    </>
  ),
  ma: (
    <>
      auf <em>‑ma</em> mit regelm. Nasal-Onbin = <em>‑nde{">"}</em>
    </>
  ),
  ka: (
    <>
      auf <em>‑ka</em> mit i-Onbin = <em>‑ite{">"}</em>
    </>
  ),
  sa: (
    <>
      auf <em>‑sa</em>
    </>
  ),
  ta: (
    <>
      auf <em>‑ta</em> mit regelm. Geminaten-Onbin = <em>-tte{">"}</em>
    </>
  ),
  na: (
    <>
      auf <em>‑na</em> mit regelm. Nasal-Onbin = <em>‑nde{">"}</em>
    </>
  ),
  ba: (
    <>
      auf <em>‑ba</em> mit regelm. Nasal-Onbin = <em>‑nde{">"}</em>
    </>
  ),
  ga: (
    <>
      auf <em>‑ga</em> mit regelm. i-Onbin = <em>‑ide{">"}</em>
    </>
  ),
  ra_i: (
    <>
      auf <em>‑ra</em>, Sonderform mit Renyō·kei <em>‑i</em>
    </>
  ),
  wa: (
    <>
      auf <em>‑[w]a</em> mit Geminaten-Onbin = <em>‑tte{">"}</em>
    </>
  ),
  wa_o: (
    <>
      auf <em>‑[w]a</em> mit u-Onbin = <em>‑ō/ūte{">"}</em>
    </>
  ),
};

const LEVEL_MAP: Partial<Record<LevelEnum, JSX.Element | null>> = {
  "1i": <>1-st. (Ichidan)</>, // auf ‑i
  "1e": <>1-st. (Ichidan)</>, // auf ‑e
  "2i": <>2-st. (Nidan)</>, // auf ‑i bzw. ‑u
  "2e": <>2-st. (Nidan)</>, // auf ‑e bzw. ‑u
  "4": <>4-st.</>,
  "5": <>5-st. (Godan)</>,
  kuru: null, // unregelm. ... V. auf ka
  suru: null, // auf ‑suru
};

const LEVEL_CONJUNCTION_MAP: Partial<Record<LevelEnum, JSX.Element | null>> = {
  "1i": (
    <>
      auf <em>‑i</em>
    </>
  ),
  "1e": (
    <>
      auf <em>‑e</em>
    </>
  ),
  "2i": (
    <>
      auf <em>‑i</em> bzw. <em>‑u</em>
    </>
  ),
  "2e": (
    <>
      auf <em>‑e</em> bzw. <em>‑u</em>
    </>
  ),
  kuru: (
    <>
      auf <em>ka</em>
    </>
  ),
  suru: (
    <>
      auf <em>‑suru</em>
    </>
  ),
};

const TRANSITIVITY_MAP: Record<TransitivityEnum, JSX.Element> = {
  TRANS: <>trans.</>,
  INTRANS: <>intransitiv</>,
  BOTH: <>intransitiv oder transitiv</>,
};

function Doushi({
  godanrow,
  level,
  transitivity,
}: DoushiModel): JSX.Element | null {
  const pieces = [
    <>Verb, </>,
    level === "kuru" ? <>unregelm.</> : null,
    level && LEVEL_MAP[level],
    transitivity && TRANSITIVITY_MAP[transitivity],
    (godanrow && GOUDAN_MAP[godanrow]) ??
      (level && LEVEL_CONJUNCTION_MAP[level]),
  ]
    .filter(isDefined)
    .map(setKeyProperty())
    .reduce(joinBy(" "), []);

  return <>{pieces}</>;
}

function Keiyoudoushi({ no, nari }: KeiyoudoushiModel): JSX.Element {
  if (nari) {
    return (
      <>
        Na.‑Adjektiv mit <em>nari</em>
      </>
    );
  }

  return (
    <>
      Na.‑Adjektiv mit <em>na</em>
      {no && (
        <>
          {" "}
          od. <em>no</em>
        </>
      )}{" "}
      bzw. prädikativ mit <em>da</em> etc.
    </>
  );
}

function Fukushi({ suru, ni, to, taru }: FukushiModel): JSX.Element {
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
