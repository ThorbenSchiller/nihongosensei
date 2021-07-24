import React, { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

type ContentWrapperProps = {
  children: ReactNode | ReactNode[];
};

export function ContentWrapper({ children }: ContentWrapperProps): JSX.Element {
  return (
    <div className="h-screen flex flex-col mx-auto" style={{ maxWidth: 680 }}>
      <Header />
      <div className="flex flex-col  p-3 flex-grow">
        <main className="flex-grow">{children}</main>
        <Footer className="mt-4 text-center" />
      </div>
    </div>
  );
}
