export type EntryWrapperModel = {
  id: number;
  entry_json: string;
  lastchange: Date;
};

type OrthModel = {
  value: string;
  midashigo?: boolean;
  type?: "irreg" | "read" | "long" | "mistake";
};

type ReadingModel = {
  hira: string;
  hatsuon: string;
  accent: string[];
};

export type SenseModel = {
  ref?: RefModel[];
  related?: boolean;
  transAndBracketAndDef: (TransModel | DefModel)[];
  usg?: UsgModel[];
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
  | "ABREV";

export type UsgModel = {
  type?: UsgTypeEnum;
  reg?: string;
  content: string;
};

export type TransModel = {
  usgAndTrAndDef: (TrModel | UsgModel | DefModel)[];
};

export type GenusType = "M" | "F" | "N" | "MN" | "MF" | "NF" | "MNF";

export type TokenModel = {
  genus?: GenusType;
  type?: string;
  content: string;
};

export type TextModel = {
  value: string;
  hasPrecedingSpace?: boolean;
  hasFollowingSpace?: boolean;
};

export type TrModel = {
  textAndTokenAndDef: (TokenModel | TextModel)[];
};

export type RuigosModel = {
  ruigos: RuigoModel[];
};

export type RuigoModel = {
  id: number;
};

export type ExplModel = {
  textAndLiteralAndTransl: (TextModel | TransModel)[];
};

export type RefModel = {
  id: number;
  jap: string;
  transcr: {
    content: string[];
  };
  type: string;
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
  ruigos?: RuigosModel[];
};
