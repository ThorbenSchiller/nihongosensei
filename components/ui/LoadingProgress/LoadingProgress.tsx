import clsx from "clsx";
import React from "react";
import styles from "./LoadingProgress.module.css";

export function LoadingProgress(): JSX.Element | null {
  return (
    <div className="h-1 w-full z-10 fixed top-0 left-0 right-0 overflow-hidden bg-primary-700">
      <div
        className={clsx("h-full bg-primary-500 absolute", styles.loading1)}
      />
      <div
        className={clsx("h-full bg-primary-500 absolute", styles.loading2)}
      />
    </div>
  );
}
