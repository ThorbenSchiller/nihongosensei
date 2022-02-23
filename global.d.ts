import { Pool } from "mysql2";

declare global {
  // seems like const or let do not work...
  // eslint-disable-next-line no-var
  var database: Pool | null;
}
