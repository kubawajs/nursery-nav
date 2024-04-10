export interface PaginatedResult<T> {
    totalItems: number;
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    items: T[];
}