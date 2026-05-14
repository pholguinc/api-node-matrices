import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/**
 * Parámetros de las variables de entorno de conexión a la base de datos
 * @property {string} DB_HOST - Host de la base de datos
 * @property {number} DB_PORT - Puerto de la base de datos
 * @property {string} DB_USER - Usuario de la base de datos
 * @property {string} DB_PASSWORD - Contraseña de la base de datos
 * @property {string} DB_NAME - Nombre de la base de datos
 * @property {string} JWT_SECRET - Secreto para firmar JWTs
 * @property {string} JWT_EXPIRES_IN - Tiempo de expiración de JWTs
 */

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

/**
 * Executes a SQL query using the connection pool.
 *
 * @param text - The SQL query string.
 * @param params - Optional parameters for the query.
 * @see {@link webcrypto.AeadParams}
 */
export const query = (text: string, params?: unknown[]) => pool.query(text, params);
