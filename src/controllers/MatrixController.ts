import { Request, Response } from "express";
import { MatrixService } from "../services/MatrixService";
import { MatrixStatsRequestDto, MatrixStatsResponseDto } from "../dtos/MatrixDto";

const matrixService = new MatrixService();

export class MatrixController {
  public async calculateStats(req: Request, res: Response) {
    try {
      const matrixResult: MatrixStatsRequestDto = req.body;
      
      // Basic validation of the input structure from the Go API
      if (!matrixResult.data || !matrixResult.data.q || !matrixResult.data.r) {
        return res.status(400).json({ 
          status: 400,
          message: "Formato de datos inválido. Se espera el resultado de la factorización QR." 
        });
      }

      const stats = matrixService.calculateStats(matrixResult);

      const response: MatrixStatsResponseDto = {
        status: 200,
        message: "Estadísticas calculadas exitosamente",
        data: stats
      };

      res.json(response);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ 
        status: 500,
        message: "Error al calcular estadísticas",
        error: message 
      });
    }
  }
}
