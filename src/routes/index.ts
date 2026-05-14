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
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/auth/register", authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generated
 */
router.post("/auth/login", authController.login);

/**
 * @openapi
 * /matrix/stats:
 *   post:
 *     summary: Calculate stats for QR factorization matrices
 *     tags: [Matrix]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   q:
 *                     type: array
 *                     items:
 *                       type: array
 *                       items:
 *                         type: number
 *                   r:
 *                     type: array
 *                     items:
 *                       type: array
 *                       items:
 *                         type: number
 *     responses:
 *       200:
 *         description: Stats calculated
 */
router.post("/matrix/stats", authMiddleware, matrixController.calculateStats);

export default router;
