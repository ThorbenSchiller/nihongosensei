import mysql, { Pool } from "mysql2";

/**
 * Establishes a database connection.
 * If DATABASE_URL is not set as env variable, an error is thrown.
 * A global connection is reused if it exists.
 */
function getConnectionPool(): Pool {
  let connection = global.database;
  if (!connection) {
    const databaseHost = process.env.DATABASE_HOST;
    const databasePort = Number(process.env.DATABASE_PORT) || undefined;
    const databaseUser = process.env.DATABASE_USER;
    const databaseName = process.env.DATABASE_NAME;
    const databasePassword = process.env.DATABASE_PASSWORD;
    if (!databaseHost || !databaseUser || !databaseName) {
      throw new Error("DATABASE_URL, DATABASE_USER or DATABASE_NAME not set");
    }
    connection = mysql.createPool({
      host: databaseHost,
      port: databasePort,
      user: databaseUser,
      password: databasePassword,
      database: databaseName,
      waitForConnections: true,
      connectionLimit: 15,
      queueLimit: 0,
    });
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
export async function execute<T>(
  query: string,
  binds: ReadonlyArray<string | number>
): Promise<T[]> {
  const [rows] = await getConnectionPool().promise().execute(query, binds);

  return rows as T[];
}
