export interface MatrixStatsRequestDto {
  status: number;
  message: string;
  data: {
    q: number[][];
    r: number[][];
  };
}

export interface MatrixStatsResponseDto {
  status: number;
  message: string;
  data: {
    max: number;
    min: number;
    avg: number;
    sum: number;
    isDiagonal: boolean;
  };
}
