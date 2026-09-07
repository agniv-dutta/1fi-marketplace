export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
}

export interface LoadingState<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
}
