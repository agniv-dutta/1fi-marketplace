import { useState } from 'react';
import type { ProductFilters } from '../types/product';

const initialFilters: ProductFilters = {
  search: '',
  category: undefined,
  priceRange: undefined,
  sortBy: undefined,
  emiTenure: undefined,
};

export const useProductFilters = () => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const updateFilters = (next: ProductFilters) => {
    setFilters(next);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    setFilters: updateFilters,
    resetFilters,
  };
};
