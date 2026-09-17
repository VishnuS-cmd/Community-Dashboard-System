export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const defaultPaginationMeta = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1
};

export function toPaginatedResponse<T>(payload: T[] | PaginatedResponse<T>, page: number, limit = 10): PaginatedResponse<T> {
  if (Array.isArray(payload)) {
    return {
      data: payload,
      meta: {
        page,
        limit,
        total: payload.length,
        totalPages: Math.max(1, Math.ceil(payload.length / limit))
      }
    };
  }

  return payload;
}
