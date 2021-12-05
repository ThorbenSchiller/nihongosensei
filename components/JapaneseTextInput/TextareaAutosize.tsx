import React, {
  CSSProperties,
  FormEvent,
  HTMLProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

function getStyleValue(
  computedStyle: CSSStyleDeclaration,
  property: Extract<keyof CSSStyleDeclaration, string>
) {
  const value = computedStyle[property];
  if (typeof value === "string") {
    return parseInt(value, 10) || 0;
  }

  return 0;
}

const styles: Record<string, CSSProperties> = {
  /* Styles applied to the shadow textarea element. */
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)",
  },
};

type TextareaAutosizeProps = HTMLProps<HTMLTextAreaElement>;

/**
 * A textarea component which automatically resizes the height according to
 * the input.
 *
 * Inspired by https://raw.githubusercontent.com/mui-org/material-ui/master/packages/material-ui/src/TextareaAutosize/TextareaAutosize.js
 *
 * @param props
 */
export function TextareaAutosize(props: TextareaAutosizeProps): JSX.Element {
  const { onChange, style, value, ...other } = props;
  const { current: isControlled } = useRef(value != null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const shadowRef = useRef<HTMLTextAreaElement>(null);
  const renders = useRef(0);
  const [state, setState] = useState<{
    outerHeightStyle?: number;
    overflow?: boolean;
  }>({});

  const syncHeight = useCallback(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    const computedStyle = window.getComputedStyle(input);

    // If input's width is shrunk and it's not visible, don't sync height.
    if (computedStyle.width === "0px") {
      return;
    }

    const inputShallow = shadowRef.current;
    if (!inputShallow) {
      return;
    }
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || "x";
    if (inputShallow.value.slice(-1) === "\n") {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += " ";
    }

    const boxSizing = computedStyle["boxSizing"];
    const padding =
      getStyleValue(computedStyle, "paddingBottom") +
      getStyleValue(computedStyle, "paddingTop");
    const border =
      getStyleValue(computedStyle, "borderBottomWidth") +
      getStyleValue(computedStyle, "borderTopWidth");

    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight;

    // Measure height of a textarea with a single row
    inputShallow.value = "x";
    const singleRowHeight = inputShallow.scrollHeight;

    // The height of the outer content
    let outerHeight = innerHeight;
    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle =
      outerHeight + (boxSizing === "border-box" ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;

    setState((prevState) => {
      // Need a large enough difference to update the height.
      // This prevents infinite rendering loop.
      if (
        renders.current < 20 &&
        ((outerHeightStyle > 0 &&
          Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1) ||
          prevState.overflow !== overflow)
      ) {
        renders.current += 1;
        return {
          overflow,
          outerHeightStyle,
        };
      }

      if (process.env.NODE_ENV !== "production") {
        if (renders.current === 20) {
          console.error(
            [
              "Material-UI: Too many re-renders. The layout is unstable.",
              "TextareaAutosize limits the number of renders to prevent an infinite loop.",
            ].join("\n")
          );
        }
      }

      return prevState;
    });
  }, [props.placeholder]);

  useEffect(() => {
    const handleResize = () => {
      renders.current = 0;
      syncHeight();
    };

    document.addEventListener("resize", handleResize);
    return () => {
      // handleResize.clear();
      document.removeEventListener("resize", handleResize);
    };
  }, [syncHeight]);

  useEffect(() => {
    syncHeight();
  });

  useEffect(() => {
    renders.current = 0;
  }, [value]);

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    renders.current = 0;

    if (!isControlled) {
      syncHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <textarea
        value={value}
        onChange={handleChange}
        ref={inputRef}
        style={{
          height: state.outerHeightStyle,
          // Need a large enough difference to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: state.overflow ? "hidden" : undefined,
          ...style,
        }}
        {...other}
      />
      <textarea
        aria-hidden="true"
        className={props.className}
        readOnly={true}
        ref={shadowRef}
        tabIndex={-1}
        style={{
          ...styles.shadow,
          padding: 0,
          ...style,
        }}
      />
    </>
  );
}
