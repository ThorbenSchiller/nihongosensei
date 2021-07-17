import RouterLink from "next/link";
import { RefModel, RefTypeEnum } from "../../services/VocabularyService";
import React from "react";
import { Link } from "../Link";

const TYPE_MAP: Record<RefTypeEnum, string> = {
  ALTREAD: "→",
  ANTO: "⇔",
  ALTTRANSCR: "☞",
  SYN: "⇒",
  MAIN: "",
  OTHER: "",
};

type RefProps = RefModel & {
  className?: string;
};

export function Ref({
  id,
  jap,
  transcr,
  type,
  className = "",
}: RefProps): JSX.Element {
  return (
    <RouterLink href={`/entry/${id}`} passHref={true}>
      <Link className={className}>
        <span className="font-serif">{TYPE_MAP[type]}</span>{" "}
        {transcr && <i>{transcr.content.join(", ")}</i>} {jap}
      </Link>
    </RouterLink>
  );
}
