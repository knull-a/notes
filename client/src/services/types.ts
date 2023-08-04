export type WithPage<T> = {
  data: T;
  paging: {
    total: number;
    pages: number;
    currentPage: number;
    pageSize: number;
  };
};