import Resolver from "@/api/resolver";
import type { UsersResponseDto } from "@/api/dto/users-response.dto";

export class UserResolver {
  private apiResolver = new Resolver("users")

  public async getAll() {
    return this.apiResolver.request<
      null,
      UsersResponseDto
    >(
      "",
      "GET",
      null
    )
  }
}