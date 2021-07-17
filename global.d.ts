import { Connection } from "mysql2";

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
