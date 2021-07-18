import mysql, { Connection } from "mysql2";

/**
 * Establishes a database connection.
 * If DATABASE_URL is not set as env variable, an error is thrown.
 * A global connection is reused if it exists.
 */
function getConnection(): Connection {
  let connection = global.database;
  if (!connection) {
    const databaseurl = process.env.DATABASE_URL;
    if (!databaseurl) {
      throw new Error("DATABASE_URL not set");
    }
    connection = mysql.createConnection(databaseurl);
  }

  return connection;
}

export type Executor = typeof execute;

/**
 * Performs a database query with the given query and binds.
 * This function will establish a connection if no previous connections exists.
 *
 * @param query The query to execute.
 * @param binds The binds to apply.
 */
export function execute<T>(
  query: string,
  binds: ReadonlyArray<string | number>
): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) =>
    getConnection().query(query, binds, (error, results) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(results as T[]);
    })
  );
}
