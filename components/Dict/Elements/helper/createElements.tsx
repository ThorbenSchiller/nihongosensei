import { MinorText } from "@components/ui";
import { setKeyProperty } from "../../helper";
import { isDef, isExpl, isTrans } from "./guards";
import { mapElement } from "./mapElement";

type ElementType<T> = T | null | JSX.Element;

const WHITESPACE = <> </>;

function isExplOrDef(input: unknown) {
  return isExpl(input) || isDef(input);
}

export function createElements<T>(
  elements: ReadonlyArray<ElementType<T>>
): JSX.Element[] | null {
  const created: JSX.Element[] = [];

  let carry: JSX.Element[] | undefined = undefined;

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const currentElementIsExplOrDef = isExplOrDef(element);

    if (isTrans(element) && isTrans(elements[index - 1])) {
      created.push(<MinorText>;</MinorText>);
    }
    if (currentElementIsExplOrDef && isExplOrDef(elements[index - 1])) {
      (carry ?? created).push(<>;</>);
    }

    if (index !== 0) {
      if (!carry) {
        created.push(WHITESPACE);
      } else if (carry?.length > 0) {
        carry.push(WHITESPACE);
      }
    }

    if (currentElementIsExplOrDef && !carry) {
      carry = [];
    } else if (!currentElementIsExplOrDef && carry) {
      created.push(<MinorText>({carry})</MinorText>);
      carry = undefined;
    }

    const mappedElement = mapElement(element);
    if (!mappedElement) {
      console.warn("element could not be mapped", element);

      continue;
    }

    (carry ?? created).push(mappedElement);
  }

  if (carry) {
    created.push(<MinorText>({carry.map(setKeyProperty())})</MinorText>);
  }

  return created.map(setKeyProperty());
}
