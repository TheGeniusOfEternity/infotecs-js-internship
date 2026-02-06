import type { UserResponseDto } from "@/api/dto/user-response.dto";

export interface UsersResponseDto {
  users: UserResponseDto[];
  total: number;
  skip: number;
  limit: number;
}