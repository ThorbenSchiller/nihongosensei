export type EntryWrapperModel = {
  id: number;
  entry_json: EntryModel;
  lastchange: Date;
};

export type OrthTypes = "IRREG" | "READ" | "LONG" | "MISTAKE";

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
  transAndBracketAndDef?: (TransModel | DefModel | BracketModel)[];
  usg?: UsgModel[];
  sense?: SenseModel[];
  descr?: DescrModel;
  etym?: EtymModel[];
};

export type EtymModel = {
  textAndRefAndLiteral?: (Text | string)[];
  abbrev?: AbbrevModel;
};

export type ForeignModel = {
  textAndEmph: (TextModel | EmphModel)[];
};

export type AbbrevModel = {
  ref?: RefModel;
};

export type DescrModel = {
  textAndJapAndTranscr: (TextModel | ForeignModel | string)[];
};

export type BracketModel = {
  defAndExplAndBirthdeath: (DefModel | ExplModel)[];
};

export type DefModel = {
  textAndLiteralAndTransl: TextModel[];
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
};

export type TransModel = {
  usgAndTrAndDef: (TrModel | UsgModel | DefModel)[];
};

export type GenusType = "M" | "F" | "N" | "MN" | "MF" | "NF" | "MNF";

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
  genus?: GenusType;
  type?: TokenTypeEnum;
  content: string;
  article?: boolean;
};

export type TextModel = {
  value: string;
  hasPrecedingSpace?: boolean;
  hasFollowingSpace?: boolean;
};

export type EmphModel = {
  value: string;
};

export type TrModel = {
  textAndTokenAndDef: (TokenModel | TextModel | DefModel)[];
};

export type RuigosModel = {
  ruigo: RuigoModel[];
};

export type RuigoModel = {
  id: number;
};

export type ExplModel = {
  textAndLiteralAndTransl: (TextModel | TransModel)[];
};

export type RefTypeEnum =
  | "MAIN"
  | "SYN"
  | "ANTO"
  | "ALTREAD"
  | "ALTTRANSCR"
  | "OTHER";

export type RefModel = {
  id: number;
  jap: string;
  transcr: {
    content: string[];
  };
  type: RefTypeEnum;
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
  sense: SenseModel[];
  steinhaus?: string[];
  ruigos?: RuigosModel;
  ref?: RefModel[];
};
