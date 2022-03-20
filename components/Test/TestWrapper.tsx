import React, { ReactNode } from "react";

export type TestWrapperProps = {
  children: ReactNode | ReactNode[];
};

export function TestWrapper({ children }: TestWrapperProps): JSX.Element {
  return <main className="p-8">{children}</main>;
}
