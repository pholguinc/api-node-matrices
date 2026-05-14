import { MatrixStatsRequestDto } from "../dtos/MatrixDto";

export interface MatrixStats {
  max: number;
  min: number;
  avg: number;
  sum: number;
  isDiagonal: boolean;
}

export class MatrixService {
  public calculateStats(result: MatrixStatsRequestDto): MatrixStats {
    const { q, r } = result.data;
    const allValues = [...q.flat(), ...r.flat()];

    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    const sum = allValues.reduce((acc, val) => acc + val, 0);
    const avg = sum / allValues.length;

    return {
      max,
      min,
      avg,
      sum,
      isDiagonal: this.isDiagonal(q) && this.isDiagonal(r),
    };
  }

  private isDiagonal(matrix: number[][]): boolean {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (i !== j && matrix[i][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  }
}
