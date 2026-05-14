import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { MatrixController } from "../controllers/MatrixController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const authController = new AuthController();
const matrixController = new MatrixController();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar Usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
router.post("/auth/register", authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Token generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
router.post("/auth/login", authController.login);

/**
 * @openapi
 * /matrix/stats:
 *   post:
 *     summary: Calcular Estadísticas de una Matriz
 *     tags: [Matrix]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatrixStatsRequest'
 *     responses:
 *       200:
 *         description: Stats calculated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MatrixStatsResponse'
 */
router.post("/matrix/stats", authMiddleware, matrixController.calculateStats);

export default router;
