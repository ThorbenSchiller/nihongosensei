import { GetServerSideProps } from "next";
import Head from "next/head";
import RouterLink from "next/link";
import React, { useCallback, useState } from "react";
import { JapaneseTextContainer } from "../../components/JapaneseTextInput";
import { Grid, Link, Logo } from "../../components/ui";
import { VocabularyContainer } from "../../components/Vocabulary";
import { FuriganaModel, FuriganaService } from "../../services/FuriganaService";
import { SITE_NAME } from "../_app";

type FuriganaIndexProps = {
  text: string | null;
  furigana: ReadonlyArray<FuriganaModel> | null;
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
        <RouterLink href="/" passHref={true}>
          <Link color="text" style={{ gridArea: "header" }}>
            <Logo text="Furigana Generator" />
          </Link>
        </RouterLink>
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
