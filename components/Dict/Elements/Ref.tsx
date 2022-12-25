import { Link } from "@components/ui";
import type { RefModel, RefTypeEnum } from "@services/VocabularyService";
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
    <Link href={`${detailBasePath}/${id}`} className={className}>
      {TYPE_MAP[type]} {transcr && <i>{transcr.content.join(", ")}</i>} {jap}
    </Link>
  );
}
