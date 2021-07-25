export type EntryWrapperModel = {
  id: number;
  entry_json: EntryModel;
  lastchange: Date;
};

export type OrthTypes =
  // irreguläre Schreibung
  | "IRREG"
  // irreguläre Lesung
  | "READ"
  // enthält Langzeichen aka Kyuji/Itaiji
  | "LONG"
  // häufige Falschschreibung
  | "MISTAKE";

export type OrthModel = {
  value: string;
  midashigo?: boolean;
  type?: OrthTypes;
};

type ReadingModel = {
  hira: string;
  hatsuon: string;
  accent: string[];
};

export type SenseModel = {
  ref?: RefModel[];
  related?: boolean;
  transAndBracketAndDef?: (TransModel | BracketModel | DefModel | ExplModel)[];
  usg?: UsgModel[];
  sense?: SenseModel[];
  descr?: DescrModel;
  etym?: EtymModel[];
  _element: "SenseType";
};

export type EtymModel = {
  textAndRefAndLiteral?: (Text | string)[];
  abbrev?: AbbrevModel;
  _element: "EtymType";
};

export type ForeignModel = {
  textAndEmph: (TextModel | EmphModel)[];
  _element: "ForeignType";
};

export type AbbrevModel = {
  ref?: RefModel;
  _element: "AbbrevType";
};

export type DescrModel = {
  textAndJapAndTranscr: (TextModel | ForeignModel | string)[];
  _element: "DescrType";
};

export type BracketModel = {
  defAndExplAndBirthdeath: (DefModel | ExplModel)[];
  _element: "BracketType";
};

export type DefModel = {
  textAndLiteralAndTransl: TextModel[];
  _element: "DefType";
};

export type UsgTypeEnum =
  | "GEO"
  | "TIME"
  | "DOM"
  | "REG"
  | "STYLE"
  | "PLEV"
  | "ACC"
  | "LANG"
  | "GRAM"
  | "SYN"
  | "HYPER"
  | "COLLOC"
  | "COMP"
  | "OBJ"
  | "SUBJ"
  | "VERB"
  | "HINT"
  | "SCIENTIFIC"
  | "SEASONWORD"
  | "FAMILYNAME"
  | "ABREV"
  | "UNKNOWN"; // own type

export type UsgModel = {
  type?: UsgTypeEnum;
  reg?: string;
  content: string;
  _element: "UsgType";
};

export type ElementProvider = {
  _element: string;
};

export type TransModel = {
  usgAndTrAndDef: (TrModel | UsgModel | DefModel)[];
  _element: "TransType";
};

export type GenusEnum = "M" | "F" | "N" | "MN" | "MF" | "NF" | "MNF";

export type NumerusEnum = "PL" | "SG";

export type TokenTypeEnum =
  | "N"
  | "V"
  | "ADJ"
  | "ADN"
  | "ADV"
  | "BSP_SATZ"
  | "HILFSV"
  | "INTERJ"
  | "KANJI"
  | "KONJ"
  | "PART"
  | "PRAEEF"
  | "PRON"
  | "SUFF"
  | "ZUS"
  | "REDENSART"
  | "WORTKOMP"
  | "SONDERZEICHEN"
  | "THEMENPART"
  | "SONDERFORM"
  | "UNDEF";

export type TokenModel = {
  genus?: GenusEnum;
  numerus?: NumerusEnum;
  type?: TokenTypeEnum;
  content: string;
  article?: boolean;
  _element: "TokenType";
};

export type FamnModel = {
  value: string;
  _element: "FamnType";
};

export type TitleModel = {
  textAndTokenAndEmph: (TextModel | TokenModel | EmphModel)[];
  orig?: boolean;
  lang?: string;
  abbrev?: boolean;
  _element: "TitleType";
};

export type TextModel = {
  value: string;
  hasPrecedingSpace?: boolean;
  hasFollowingSpace?: boolean;
  _element: "TextType";
};

export type EmphModel = {
  value: string;
  _element: "EmphType";
};

export type TrModel = {
  textAndTokenAndDef: (TokenModel | TextModel | DefModel)[];
  _element: "TrComplexType";
};

export type RuigosModel = {
  ruigo: RuigoModel[];
};

export type RuigoModel = {
  id: number;
};

export type ExplModel = {
  textAndLiteralAndTransl: (TextModel | TransModel)[];
  _element: "ExplType";
};

export type IronModel = {
  textAndToken: (TextModel | TokenModel)[];
  _element: "IronType";
};

export type SpeccharModel = {
  value: string;
  _element: "SpeccharType";
};

export type TopicModel = {
  value: string;
  _element: "TopicType";
};

export type RefTypeEnum =
  // Referenz auf Haupteintrag
  | "MAIN"
  // Referenz auf Synonym
  | "SYN"
  // Referenz auf Antonym
  | "ANTO"
  // Referenz auf alternative Lesung
  | "ALTREAD"
  // Referenz auf alternative Katakana-Transkription eines Fremdwortes<
  | "ALTTRANSCR"
  // einfache Referenz
  | "OTHER";

export type RefModel = {
  id: number;
  jap: string;
  transcr: {
    content: string[];
  };
  type: RefTypeEnum;
  _element: "RefType";
};

export type TranscrModel = {
  content: string[];
  _element: "TranscrType";
};

export type TransitivityEnum = "TRANS" | "INTRANS" | "BOTH";

export type LevelEnum =
  | "1i"
  | "1e"
  | "2i"
  | "2e"
  | "4"
  | "5"
  | "suru"
  | "kuru"
  | "ra";

export type GodanrowEnum =
  | "wa"
  | "wa_o"
  | "ba"
  | "ga"
  | "ka"
  | "ka_i_yu"
  | "ra"
  | "ra_i"
  | "na"
  | "ma"
  | "sa"
  | "ta";

export type DoushiModel = {
  _element: "Doushi";
  level?: LevelEnum;
  transitivity?: TransitivityEnum;
  onbin?: boolean;
  godanrow?: GodanrowEnum;
};

export type KeiyoudoushiModel = {
  no?: boolean;
  nari?: boolean;
  _element: "Keiyoudoushi";
};

export type FukushiModel = {
  ni?: boolean;
  to?: boolean;
  taru?: boolean;
  suru?: TransitivityEnum;
  _element: "Fukushi";
};

export type GramGrpModel = {
  meishi?: { _element: "Meishi" };
  /**
   * Hilfsverb/助動詞
   */
  jodoushi?: { _element: "Jodoushi" };
  /**
   * Partikel/助詞
   */
  joshi?: { _element: "Joshi" };
  /**
   * Adverb
   */
  fukushi?: FukushiModel;
  /**
   * i-Adjektiv/ku-Adjektiv/形容詞
   */
  keiyoushi?: {
    ku?: boolean;
    shiku?: boolean;
    _element: "Keiyoushi";
  };
  /**
   * na-Adjektiv/Nominaladjektiv/形容動詞
   */
  keiyoudoushi?: KeiyoudoushiModel;
  /**
   * Interjektion/感動詞
   */
  kandoushi?: { _element: "Kandoushi" };
  /**
   * Präfix/接頭語
   */
  prefix?: { _element: "Prefix" };
  /**
   * Suffix/接尾語
   */
  suffix?: { _element: "Suffix" };
  /**
   * Adnomen/連体詞
   */
  rentaishi: { _element: "Rentaishi" };
  /**
   * Konjunktion/接続詞
   */
  setsuzokushi?: { _element: "Setsuzokushi" };
  /**
   * Pronomen/代名詞
   */
  daimeishi?: { _element: "Daimeishi" };
  /**
   * Konjunktionalpartikel/接続助詞
   */
  setsuzokujoshi?: { _element: "Setsuzokujoshi" };
  /**
   * Satzschlusspartikel/終助詞
   */
  shuujoshi?: { _element: "Shuujoshi" };
  /**
   * Themapartikel = keijoshi/係助詞
   */
  kakarijoshi?: { _element: "Kakarijoshi" };
  /**
   * Kasuspartikel/格助詞
   */
  kakujoshi?: { _element: "Kakujoshi" };
  /**
   * Adverbialpartikel/副助詞
   */
  fukujoshi?: { _element: "Fukujoshi" };
  /**
   * Wortkomponente/造
   */
  wordcomponent?: { _element: "Wordcomponent" };
  /**
   * Sonderzeichen
   */
  specialcharacter?: { _element: "Specialcharacter" };
  /**
   * Kanji/漢字
   */
  kanji?: { _element: "Kanji" };
  /**
   * Zusammensetzung/連語
   */
  rengo?: { _element: "Rengo" };
  /**
   * Verb/動詞
   */
  doushi?: DoushiModel[];
  _element: "GramGrpType";
};

export type EntryModel = {
  id: number;
  version: string;
  he: boolean;
  expl?: ExplModel[];
  form: {
    orth: OrthModel[];
    reading: ReadingModel;
  };
  usg?: UsgModel[];
  gramGrp?: GramGrpModel;
  sense: SenseModel[];
  steinhaus?: string[];
  ruigos?: RuigosModel;
  ref?: RefModel[];
};

export type SubentryTypeEnum =
  // Komponentenanfang
  | "HEAD"
  // Komponentenende
  | "TAIL"
  // Ableitung, Nominalisierung mit sa
  | "SA"
  // Ableitung mit suru
  | "SURU"
  // Ableitung mit saseru
  | "SASERU"
  // Ableitung mit shita
  | "SHITA"
  // Ableitung mit shite
  | "SHITE"
  // Ableitung mit teki
  | "TEKI"
  // Ableitung mit to
  | "TO"
  // Ableitung mit taru
  | "TARU"
  // Ableitung mit na
  | "NA"
  // Ableitung mit ni
  | "NI"
  // Ableitung mit no
  | "NO"
  // Ableitung mit da
  | "DA"
  // Ableitung mit de
  | "DE"
  // Ableitung mit e
  | "E"
  // Ableitung mit Präfix o-
  | "O"
  // Ableitung mit kara
  | "KARA"
  // Ableitung mit garu
  | "GARU"
  // Ableitung mit ge
  | "GE"
  // Ableitung, Adverb mit ku
  | "KU"
  // Ableitung, Nominalisierung mit mi
  | "MI"
  // Verwendungsbeispiel
  | "VW_BSP"
  // W_Idiom
  | "W_IDIOM"
  // XSatz
  | "X_SATZ"
  // Z_Sprichwort
  | "Z_SPR_W"
  // andere Ableitung
  | "OTHER";

export type EntryRefModel = {
  target_id: number;
  source_id: number;
  type: RefTypeEnum;
  subentrytype?: SubentryTypeEnum;
};

export type ResolvedEntryRefModel = {
  type: RefTypeEnum;
  subentrytype?: SubentryTypeEnum;
  entry: EntryModel;
};
