import React, { memo, useMemo, useState, ReactNode } from "react";
import { GlobalLoadingContext } from "./GlobalLoadingContext";
import AbsoluteLoadingProgress from "./AbsoluteLoadingProgress";

type GlobalLoadingContainerProps = {
  children: ReactNode | ReactNode[];
};

function GlobalLoadingContainer({ children }: GlobalLoadingContainerProps) {
  const [loading, setLoading] = useState(false);
  const contextValue = useMemo(
    () => ({
      setLoading,
    }),
    []
  );

  return (
    <GlobalLoadingContext.Provider value={contextValue}>
      {loading && <AbsoluteLoadingProgress />}
      {children}
    </GlobalLoadingContext.Provider>
  );
}

export default memo(GlobalLoadingContainer);
