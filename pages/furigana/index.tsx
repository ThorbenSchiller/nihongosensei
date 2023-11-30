import {
  JapaneseTextContainer,
  VocabularyContainer,
} from "@components/FuriganaGenerator";
import { Grid, Link, Logo } from "@components/ui";
import { SITE_NAME } from "@services/constants";
import { FuriganaModel, FuriganaService } from "@services/FuriganaService";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

type FuriganaIndexProps = {
  text: string | null;
  furigana: ReadonlyArray<FuriganaModel | string> | null;
  error: string | null;
};

const DEFAULT_TEXT = process.env.DEFAULT_FURIGANA_INPUT_VALUE;

const furiganaService = FuriganaService.getInstance();

export default function FuriganaIndex({
  text,
  furigana,
  error,
}: FuriganaIndexProps): JSX.Element {
  const [vocabulary, setVocabulary] = useState<string>("");
  const handleRubyClick = useCallback((model: FuriganaModel) => {
    setVocabulary(model.basicForm ?? model.text);
  }, []);

  return (
    <>
      <Head>
        <title>Furigana Generator - {SITE_NAME}</title>
        <meta name="description" content="Einfacher Generator für Furigana." />
      </Head>
      <Grid>
        <Link href="/" color="text" style={{ gridArea: "header" }}>
          <Logo text="Furigana Generator" />
        </Link>
        <JapaneseTextContainer
          onRubyClick={handleRubyClick}
          defaultValue={text}
          defaultFurigana={furigana}
          defaultError={error}
        />
        <VocabularyContainer
          onChange={setVocabulary}
          vocabulary={vocabulary}
          className="sticky top-3"
        />
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  FuriganaIndexProps
> = async (context) => {
  const { text: queryText = DEFAULT_TEXT } = context.query ?? {};
  const text = (Array.isArray(queryText) ? queryText[0] : queryText) ?? "";
  let error = null;
  let furigana = null;
  try {
    furigana = text ? await furiganaService.getFurigana(text) : [];
  } catch (e) {
    console.error(e);
    error = "Could not convert to furigana.";
  }

  return {
    props: {
      text,
      furigana,
      error,
    },
  };
};
