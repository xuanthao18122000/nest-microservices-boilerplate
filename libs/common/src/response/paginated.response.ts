import { PaginationOptions } from '../utils/pagination-options.util';

export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  perPage: number;
}


export function responsePagination<K extends PaginationOptions, T>(
  list: Array<T>,
  total: number,
  query: K,
): PaginatedResponse<T> {
  const page = query.getFull ? 1 : Math.max(1, query.page || 1);
  const perPage = query.getFull ? Number.MAX_SAFE_INTEGER : Math.max(1, query.perPage || 10);

  return {
    list: query.getFull ? [] : list,
    total: query.getFull ? 0 : total,
    page,
    perPage,
  };
}
