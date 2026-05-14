export interface RegisterRequestDto {
  username: string;
  password: string;
}

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  message: string;
  user?: {
    id: string;
    username: string;
  };
  token?: string;
}
