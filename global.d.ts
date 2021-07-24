import { Pool } from "mysql2";

declare global {
  interface Window {
    database: Pool | null;
  }

  namespace NodeJS {
    export interface Global {
      database: Pool | null;
    }
  }
}
