export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  emiAvailable: boolean;
  emiPlanIds: string[];
  stock: number;
  featured?: boolean;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  priceRange?: [number, number];
  sortBy?: 'price-low' | 'price-high' | 'newest' | 'rating';
  emiTenure?: number;
}
