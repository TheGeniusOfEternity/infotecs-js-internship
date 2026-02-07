export type SortField = "firstName" | "maidenName" | "lastName" | "age" | "gender" | "phone" | null;
export type SortDirection = "asc" | "desc" | null;

export interface Filters {
  firstName?: string;
  maidenName?: string;
  lastName?: string;
  age?: string;
  gender?: string;
  phone?: string;
}

export interface Pagination {
  page: number;
  limit: number;
}