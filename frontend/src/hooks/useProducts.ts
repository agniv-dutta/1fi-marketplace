import { useCallback, useRef, useState } from 'react';
import { productApi } from '../services/api/productApi';
import type { Product, ProductFilters } from '../types/product';

interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  fetchProducts: (filters?: ProductFilters, page?: number) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useProducts = (initialFilters?: ProductFilters): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 12,
    total: 0,
  });
  const lastFiltersRef = useRef<ProductFilters | undefined>(initialFilters);
  const lastPageRef = useRef(1);

  const fetchProducts = useCallback(
    async (nextFilters?: ProductFilters, page = 1) => {
      setLoading(true);
      setError(null);

      try {
        const response = await productApi.fetchProducts(
          nextFilters ?? lastFiltersRef.current,
          page,
          pagination.limit,
        );

        setProducts(response.data);
        setPagination(response.pagination);
        lastFiltersRef.current = nextFilters ?? lastFiltersRef.current;
        lastPageRef.current = page;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch products';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit],
  );

  const refetch = useCallback(
    () => fetchProducts(lastFiltersRef.current, lastPageRef.current),
    [fetchProducts],
  );

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    refetch,
  };
};
