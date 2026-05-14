import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { RegisterRequestDto, LoginRequestDto, AuthResponseDto } from "../dtos/AuthDto";

const authService = new AuthService();

export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { username, password }: RegisterRequestDto = req.body;
      const user = await authService.register(username, password);
      const response: AuthResponseDto = {
        message: "User created successfully",
        user: { id: user.id, username: user.username },
      };
      res.status(201).json(response);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(400).json({ message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password }: LoginRequestDto = req.body;
      const token = await authService.login(username, password);
      if (!token) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const response: AuthResponseDto = {
        message: "Login successful",
        token,
      };
      res.json(response);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error interno del servidor";
      res.status(500).json({ message });
    }
  }
}
