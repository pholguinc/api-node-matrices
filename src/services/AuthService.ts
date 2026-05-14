import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

export class AuthService {
  /**
   * @async
   * @description Registra un nuevo usuario
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<User>} - Usuario registrado
   */
  public async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserRepository.create({ username, password: hashedPassword });
  }

  /**
   * @async
   * @description Inicia sesión
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<string | null>} - Token de autenticación o null
   */
  public async login(
    username: string,
    password: string,
  ): Promise<string | null> {
    const user = await UserRepository.findByUsername(username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const secret = process.env.JWT_SECRET!;
    const expiresIn = process.env
      .JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];

    return jwt.sign({ id: user.id, username: user.username }, secret, {
      expiresIn,
    });
  }
}
