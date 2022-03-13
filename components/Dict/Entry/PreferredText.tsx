import { MinorText, MinorTextProps } from "@components/ui";
import React, { cloneElement, ReactNode } from "react";

const PreferredTextSign = (props: MinorTextProps) => (
  <MinorText className="select-none" {...props} />
);

const ReadingSign = ({ children }: { children: ReactNode }) => (
  <PreferredTextSign
    style={{
      fontSize: "60%",
      verticalAlign: "40%",
    }}
  >
    {children}
  </PreferredTextSign>
);

const Njok = () => <ReadingSign>△</ReadingSign>;

const Njk = () => <ReadingSign>╳</ReadingSign>;

type PreferredTextProps = { text: string };

const PIECE_MAP: Record<string, JSX.Element> = {
  "△": <Njok />,
  "×": <Njk />,
  "(": <PreferredTextSign>(</PreferredTextSign>,
  ")": <PreferredTextSign>)</PreferredTextSign>,
  "{": <PreferredTextSign>《</PreferredTextSign>,
  "}": <PreferredTextSign>》</PreferredTextSign>,
  "〈": <PreferredTextSign>〈</PreferredTextSign>,
  "〉": <PreferredTextSign>〉</PreferredTextSign>,
};

export function PreferredText({ text }: PreferredTextProps): JSX.Element {
  const pieces = text.split("").map((piece, key) => {
    const mapped = PIECE_MAP[piece];
    if (mapped) {
      return cloneElement(mapped, { key });
    }

    return piece;
  });

  return <>{pieces}</>;
}
