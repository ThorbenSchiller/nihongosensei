import mysql, { format } from "mysql";

let connection = global.database;
if (!connection) {
  connection = global.database = null;
}

if (!connection) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not set");
  }
  connection = mysql.createConnection(process.env.DATABASE_URL);
}

export function execute<T>(
  query: string,
  binds: (string | number)[]
): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    connection!.query(format(query, binds), (error, results) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(results);
    })
  );
}
