import { MatrixService } from "../src/services/MatrixService";
import { MatrixStatsRequestDto } from "../src/dtos/MatrixDto";

describe("MatrixService", () => {
  let matrixService: MatrixService;

  beforeEach(() => {
    matrixService = new MatrixService();
  });

  describe("calculateStats", () => {
    it("should correctly calculate stats for identity and scalar matrices", () => {
      const mockRequest: MatrixStatsRequestDto = {
        status: 200,
        message: "Success",
        data: {
          q: [
            [1, 0],
            [0, 1],
          ],
          r: [
            [2, 0],
            [0, 2],
          ],
        },
      };

      const stats = matrixService.calculateStats(mockRequest);

      expect(stats.max).toBe(2);
      expect(stats.min).toBe(0);
      expect(stats.sum).toBe(6); // (1+0+0+1) + (2+0+0+2) = 6
      expect(stats.avg).toBe(0.75); // 6 / 8 elements = 0.75
      expect(stats.isDiagonal).toBe(true);
    });

    it("should return isDiagonal false if at least one matrix is not diagonal", () => {
      const mockRequest: MatrixStatsRequestDto = {
        status: 200,
        message: "Success",
        data: {
          q: [
            [1, 1],
            [0, 1],
          ], // Not diagonal
          r: [
            [2, 0],
            [0, 2],
          ],
        },
      };

      const stats = matrixService.calculateStats(mockRequest);
      expect(stats.isDiagonal).toBe(false);
    });

    it("should handle negative values correctly", () => {
      const mockRequest: MatrixStatsRequestDto = {
        status: 200,
        message: "Success",
        data: {
          q: [
            [-1, 0],
            [0, -1],
          ],
          r: [
            [0, 0],
            [0, 0],
          ],
        },
      };

      const stats = matrixService.calculateStats(mockRequest);
      expect(stats.min).toBe(-1);
      expect(stats.max).toBe(0);
      expect(stats.sum).toBe(-2);
    });
  });
});
