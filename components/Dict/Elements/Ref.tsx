import RouterLink from "next/link";
import React from "react";
import type {
  RefModel,
  RefTypeEnum,
} from "../../../services/VocabularyService";
import { Link } from "../../ui";
import { useEntryContext } from "../Context";

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
  className,
}: RefProps): JSX.Element {
  const { detailBasePath } = useEntryContext();

  return (
    <RouterLink href={`${detailBasePath}/${id}`} passHref={true}>
      <Link className={className}>
        <span className="font-serif">{TYPE_MAP[type]}</span>{" "}
        {transcr && <i>{transcr.content.join(", ")}</i>} {jap}
      </Link>
    </RouterLink>
  );
}