import { AuthService } from "../src/services/AuthService";
import { UserRepository } from "../src/repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../src/repositories/UserRepository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("Deberia hashear la contraseña y guardar el usuario", async () => {
      const username = "testuser";
      const password = "password123";
      const hashedPassword = "hashed_password";
      const mockUser = { id: "1", username, password: hashedPassword };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (UserRepository.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.register(username, password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(UserRepository.create).toHaveBeenCalledWith({ username, password: hashedPassword });
      expect(result).toEqual(mockUser);
    });
  });

  describe("login", () => {
    it("Deberia retornar un token para credenciales validas", async () => {
      const username = "testuser";
      const password = "password123";
      const mockUser = { id: "1", username, password: "hashed_password" };
      const mockToken = "mock_token";

      (UserRepository.findByUsername as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      process.env.JWT_SECRET = "test_secret";
      process.env.JWT_EXPIRES_IN = "1h";

      const result = await authService.login(username, password);

      expect(UserRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe(mockToken);
    });

    it("Deberia retornar null si el usuario no existe", async () => {
      (UserRepository.findByUsername as jest.Mock).mockResolvedValue(null);

      const result = await authService.login("nonexistent", "password");

      expect(result).toBeNull();
    });

    it("Deberia retornar null si la contraseña es incorrecta", async () => {
      const mockUser = { id: "1", username: "user", password: "hashed" };
      (UserRepository.findByUsername as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await authService.login("user", "wrong_password");

      expect(result).toBeNull();
    });
  });
});
