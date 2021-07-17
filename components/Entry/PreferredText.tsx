import { MinorText } from "./MinorText";
import React, { ReactNode } from "react";

const ReadingSign = ({ children }: { children: ReactNode }) => (
  <MinorText
    className="select-none"
    style={{
      fontSize: "60%",
      verticalAlign: "40%",
    }}
  >
    {children}
  </MinorText>
);

const Njok = () => <ReadingSign>△</ReadingSign>;

const Njk = () => <ReadingSign>╳</ReadingSign>;

type PreferredTextProps = { text: string };

export function PreferredText({ text }: PreferredTextProps): JSX.Element {
  const pieces = text.split("").map((piece, index) => {
    if (piece === "△") {
      return <Njok key={index} />;
    }
    if (piece === "×") {
      return <Njk key={index} />;
    }
    if (piece === "(") {
      return (
        <MinorText className="select-none" key={index}>
          (
        </MinorText>
      );
    }
    if (piece === ")") {
      return (
        <MinorText className="select-none" key={index}>
          )
        </MinorText>
      );
    }

    return piece;
  });

  return <>{pieces}</>;
}
