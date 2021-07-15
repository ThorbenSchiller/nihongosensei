import { createContext, useContext } from "react";

export type GlobalLoadingContextOptions = {
  setLoading: (loading: boolean) => void;
};

const DEFAULT_VALUE: GlobalLoadingContextOptions = {
  setLoading: () => void 0,
};

export const GlobalLoadingContext = createContext<GlobalLoadingContextOptions>(
  DEFAULT_VALUE
);

export function useGlobalLoading(): GlobalLoadingContextOptions {
  return useContext(GlobalLoadingContext);
}
