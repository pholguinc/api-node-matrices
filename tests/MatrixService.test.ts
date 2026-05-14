import { MatrixService } from "../src/services/MatrixService";
import { MatrixStatsRequestDto } from "../src/dtos/MatrixDto";

describe("MatrixService", () => {
  let matrixService: MatrixService;

  beforeEach(() => {
    matrixService = new MatrixService();
  });

  it("should calculate stats correctly for 2x2 matrices", () => {
    const mockRequest: MatrixStatsRequestDto = {
      status: 200,
      message: "Success",
      data: {
        q: [[1, 0], [0, 1]],
        r: [[2, 0], [0, 2]]
      }
    };

    const stats = matrixService.calculateStats(mockRequest);

    expect(stats.max).toBe(2);
    expect(stats.min).toBe(0);
    expect(stats.sum).toBe(6); // 1+0+0+1 + 2+0+0+2 = 6
    expect(stats.avg).toBe(0.75); // 6 / 8 elements = 0.75
    expect(stats.isDiagonal).toBe(true);
  });

  it("should identify non-diagonal matrices", () => {
    const mockRequest: MatrixStatsRequestDto = {
      status: 200,
      message: "Success",
      data: {
        q: [[1, 1], [0, 1]], // Not diagonal
        r: [[2, 0], [0, 2]]
      }
    };

    const stats = matrixService.calculateStats(mockRequest);
    expect(stats.isDiagonal).toBe(false);
  });
});
