import Resolver from "@/api/resolver";
import type { UsersResponseDto } from "@/api/resolvers/user/dto/users-response.dto";
import type {Filters, SortDirection, SortField} from "@/shared/types";

export class UserResolver {
  private apiResolver = new Resolver("users");

  public async getAll(params: URLSearchParams | null = null) {
    const queryString = params?.toString() || "";
    const url = queryString ? `?${queryString}` : "";
    return this.apiResolver.request<
      null, UsersResponseDto
    >(
      url,
      "GET",
      null
    );
  }

  public async filter(filters: Partial<Filters>, pagination: { page: number; limit: number }) {
    const params = new URLSearchParams();

    params.append("limit", pagination.limit.toString());
    params.append("skip", (pagination.page * pagination.limit).toString());

    if (filters.firstName) {
      params.append("key", "firstName");
      params.append("value", filters.firstName);
    }
    if (filters.lastName) {
      params.append("key", "lastName");
      params.append("value", filters.lastName);
    }
    if (filters.maidenName) {
      params.append("key", "maidenName");
      params.append("value", filters.maidenName);
    }
    if (filters.age) {
      params.append("key", "age");
      params.append("value", filters.age);
    }
    if (filters.gender) {
      params.append("key", "gender");
      params.append("value", filters.gender);
    }
    if (filters.phone) {
      params.append("key", "phone");
      params.append("value", filters.phone);
    }

    const filterResolver = new Resolver("users/filter");
    return filterResolver.request<null, UsersResponseDto>(`?${params.toString()}`, "GET", null);
  }

  public async getAllWithFilters(
    filters: Partial<Filters>,
    sortBy: SortField | null,
    order: SortDirection | null,
    pagination: { page: number; limit: number }
  ) {
    if (filters.firstName || filters.lastName || filters.maidenName ||
      filters.age || filters.gender || filters.phone) {
      return this.filter(filters, pagination);
    }

    const params = new URLSearchParams();
    params.append("limit", pagination.limit.toString());
    params.append("skip", (pagination.page * pagination.limit).toString());

    if (sortBy !== null && order !== null) {
      params.append("sortBy", sortBy);
      params.append("order", order);
    }

    return this.getAll(params);
  }
}
