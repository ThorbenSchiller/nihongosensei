import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./AbsoluteLoadingProgress.module.css";
import clsx from "clsx";

export function AbsoluteLoadingProgress(): JSX.Element | null {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading ? (
    <div className="h-1 w-full z-10 fixed overflow-hidden bg-primary-700">
      <div
        className={clsx("h-full bg-primary-500 absolute", styles.loading1)}
      />
      <div
        className={clsx("h-full bg-primary-500 absolute", styles.loading2)}
      />
    </div>
  ) : null;
}
