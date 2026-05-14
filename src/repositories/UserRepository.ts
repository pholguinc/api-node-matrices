import { query } from "../config/database";
import { User } from "../models/User";

export class UserRepository {
  /**
   * @description Encontrar usuario por nombre de usuario
   * @param {string} username - Nombre de usuario
   * @returns {Promise<User | null>} - Usuario encontrado o null
   */
  static async findByUsername(username: string): Promise<User | null> {
    const result = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0] || null;
  }

  /**
   * @description Crear usuario
   * @param {Partial<User>} userData - Datos del usuario
   * @returns {Promise<User>} - Usuario creado
   */
  static async create(userData: Partial<User>): Promise<User> {
    const { username, password } = userData;
    const result = await query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password],
    );
    return result.rows[0];
  }

  /**
   * @description Guardar usuario
   * @param {User} user - Usuario a guardar
   * @returns {Promise<User>} - Usuario guardado
   */
  static async save(user: User): Promise<User> {
    return user;
  }
}
