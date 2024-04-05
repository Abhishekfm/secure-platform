export type UserDetailsType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type Pagination = {
  totalCount: number;
  totalPage: number;
  limit: number;
  currentPage: number;
};

export type Response<T> = {
  data?: T;
  pageInfo?: Pagination;
  statusCode: number;
  message?: string;
};
