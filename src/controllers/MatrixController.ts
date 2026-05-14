import { Request, Response } from "express";
import { MatrixService } from "../services/MatrixService";
import {
  MatrixStatsRequestDto,
  MatrixStatsResponseDto,
} from "../dtos/MatrixDto";

const matrixService = new MatrixService();

export class MatrixController {
  /**
   * @async
   * @description Calcula estadísticas de matrices QR
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {Promise<void>}
   */
  public async calculateStats(req: Request, res: Response): Promise<void> {
    try {
      const matrixResult: MatrixStatsRequestDto = req.body;

      // Validación básica de la estructura de entrada de la API Go
      if (!matrixResult.data || !matrixResult.data.q || !matrixResult.data.r) {
        res.status(400).json({
          status: 400,
          message:
            "Formato de datos inválido. Se espera el resultado de la factorización QR.",
        });
        return;
      }

      /**
       * @description Calcula estadísticas de matrices QR
       * @param {MatrixStatsRequestDto} matrixResult - Resultado de la factorización QR
       * @returns {Promise<void>}
       */
      const stats = matrixService.calculateStats(matrixResult);

      /**
       * @description Resultado de las estadísticas de matrices QR
       * @param {MatrixStatsResponseDto} response - Resultado de las estadísticas de matrices QR
       * @returns {Promise<void>}
       */
      const response: MatrixStatsResponseDto = {
        status: 200,
        message: "Estadísticas calculadas exitosamente",
        data: stats,
      };

      res.json(response);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({
        status: 500,
        message: "Error al calcular estadísticas",
        error: message,
      });
    }
  }
}
