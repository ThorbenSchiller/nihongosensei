import { Furigana } from "@components/FuriganaGenerator/Furigana";
import type { FuriganaModel } from "@services/FuriganaService";
import clsx from "clsx";
import { Fragment, HTMLProps, JSX } from "react";

export type RubyProps = {
  /**
   * A html string which (may) contain <ruby> elements.
   * The string will be parsed and converted to own elements.
   */
  furigana: ReadonlyArray<FuriganaModel | string>;
  /**
   * Callback executed if a furigana element has been click. The argument contains the text (kanji).
   *
   * @param text The Japanese text which was clicked.
   */
  onClick?: (model: FuriganaModel) => void;
} & Omit<HTMLProps<HTMLDivElement>, "onClick">;

export function Ruby({
  furigana,
  onClick,
  className,
  ...rest
}: RubyProps): JSX.Element {
  return (
    <div
      {...rest}
      className={clsx("text-white dark:text-gray-900", className)}
      lang="ja"
      data-testid="ruby"
    >
      {furigana.map((furiganaEntry, index) =>
        typeof furiganaEntry === "string" ? (
          <Fragment key={`${furiganaEntry}-${index}`}>{furiganaEntry}</Fragment>
        ) : (
          <Furigana
            key={`ruby-${furiganaEntry.text}-${index}`}
            onClick={onClick}
            {...furiganaEntry}
          />
        ),
      )}
    </div>
  );
}
