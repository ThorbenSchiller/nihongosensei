import RouterLink from "next/link";
import { RefModel } from "../../services/VocabularyService";
import React from "react";
import { Link } from "../Link";

export function Ref({ id, jap, transcr }: RefModel): JSX.Element {
  return (
    <>
      <RouterLink href={`/entry/${id}`} passHref={true}>
        <Link>
          ⇒ <i>{transcr.content.join(", ")}</i> {jap}
        </Link>
      </RouterLink>
    </>
  );
}
