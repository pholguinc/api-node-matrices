import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import {
  RegisterRequestDto,
  LoginRequestDto,
  AuthResponseDto,
} from "../dtos/AuthDto";

const authService = new AuthService();

/**
 * @classdesc Controlador de autenticación
 * @description Esta clase maneja el registro e inicio de sesión de usuarios.
 */
export class AuthController {
  /**
   * @async
   * @description Registro de usuario
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {Promise<void>}
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password }: RegisterRequestDto = req.body;
      const user = await authService.register(username, password);
      const response: AuthResponseDto = {
        message: "User created successfully",
        user: { id: user.id, username: user.username },
      };
      res.status(201).json(response);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      res.status(400).json({ message });
    }
  }

  /**
   * @async
   * @description Inicio de sesión
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {Promise<void>}
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password }: LoginRequestDto = req.body;
      const token = await authService.login(username, password);
      if (!token) {
        res.status(401).json({ message: "Credenciales invalidas" });
        return;
      }
      const response: AuthResponseDto = {
        message: "Inicio de sesión exitoso",
        token,
      };
      res.json(response);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error interno del servidor";
      res.status(500).json({ message });
    }
  }
}
