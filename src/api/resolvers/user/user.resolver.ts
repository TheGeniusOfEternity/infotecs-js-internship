import Resolver from "@/api/resolver";
import type { UsersResponseDto } from "@/api/resolvers/user/dto/users-response.dto";
import type { SortDirection, SortField } from "@/shared/types";

export class UserResolver {
  private apiResolver = new Resolver("users")

  public async getAll(sortBy: SortField, order: SortDirection) {
    const params = sortBy !== null && order !== null
      ? `?sortBy=${sortBy}&order=${order}`
      : null

    return this.apiResolver.request<
      null,
      UsersResponseDto
    >(
      params ?? "",
      "GET",
      null
    )
  }
}