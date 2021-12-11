import React, { createContext, ReactNode, useContext } from "react";

type EntryContextProps = {
  detailBasePath: string;
};

const EntryContext = createContext({
  detailBasePath: "/entry",
});

export const useEntryContext = (): EntryContextProps =>
  useContext(EntryContext);

export function EntryContextProvider({
  children,
  ...props
}: EntryContextProps & { children: ReactNode }): JSX.Element {
  return (
    <EntryContext.Provider value={props}>{children}</EntryContext.Provider>
  );
}
