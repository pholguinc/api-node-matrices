import request from "supertest";
import app from "../src/app";
import { UserRepository } from "../src/repositories/UserRepository";
import bcrypt from "bcryptjs";

jest.mock("@scalar/express-api-reference", () => ({
  apiReference: jest.fn(() => (req: unknown, res: unknown, next: () => void) => next()),
}));
jest.mock("../src/repositories/UserRepository");
jest.mock("bcryptjs");

describe("Auth Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("Debe registrar un nuevo usuario y retornar 201", async () => {
      const userData = { username: "testuser", password: "password123" };
      const mockUser = { id: "1", username: "testuser", createdAt: new Date() };

      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
      (UserRepository.create as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/api/auth/register")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty("id", "1");
    });

    it("Debe retornar 400 si ocurre un error", async () => {
      (UserRepository.create as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await request(app)
        .post("/api/auth/register")
        .send({ username: "test", password: "123" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /api/auth/login", () => {
    it("Debe iniciar sesión correctamente y devolver un token", async () => {
      const credentials = { username: "testuser", password: "password123" };
      const mockUser = {
        id: "1",
        username: "user123",
        password: "hashed_password123",
      };

      (UserRepository.findByUsername as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      process.env.JWT_SECRET = "test_secret";
      process.env.JWT_EXPIRES_IN = "1h";

      const response = await request(app)
        .post("/api/auth/login")
        .send(credentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("Debe retornar 401 para credenciales invalidas", async () => {
      (UserRepository.findByUsername as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "wrong", password: "password" });

      expect(response.status).toBe(401);
    });
  });
});
