import React, { HTMLProps } from "react";
import styles from "./Grid.module.css";

type GridProps = HTMLProps<HTMLDivElement>;

export function Grid({ className = "", ...rest }: GridProps): JSX.Element {
  return <div className={`${styles.grid} ${className}`} {...rest} />;
}
