import type { KeiyoudoushiModel } from "@services/VocabularyService";

export function Keiyoudoushi({ no, nari }: KeiyoudoushiModel): JSX.Element {
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
