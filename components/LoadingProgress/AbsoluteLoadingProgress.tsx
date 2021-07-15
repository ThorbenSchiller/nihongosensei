import React, { memo } from "react";
import styles from "./AbsoluteLoadingProgress.module.css";

function AbsoluteLoadingProgress() {
  return (
    <div className="h-1 w-full z-10 fixed overflow-hidden bg-primary-700">
      <div className={`h-full bg-primary-500 absolute ${styles.loading1}`} />
      <div className={`h-full bg-primary-500 absolute ${styles.loading2}`} />
    </div>
  );
}

export default memo(AbsoluteLoadingProgress);
