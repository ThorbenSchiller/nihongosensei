import { Connection } from "mysql";

declare global {
  interface Window {
    database: Connection | null;
  }

  namespace NodeJS {
    export interface Global {
      database: Connection | null;
    }
  }
}
