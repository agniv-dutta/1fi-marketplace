import productsData from '../mockData/products.json';
import { emiPlans } from '../mockData/emiPlans';
import type { Product, ProductFilters } from '../../types/product';
import type { ApiResponse, PaginationInfo } from '../../types/common';
import type { EMIPlan } from '../../types/emi';
import { validateProduct } from '../../utils/validators';

type ProductListResponse = ApiResponse<Product[]> & {
  pagination: PaginationInfo;
};

type ProductDetailResponse = ApiResponse<Product>;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const readProducts = (): Product[] =>
  (productsData.data as unknown as Product[]).filter(validateProduct);

const matchesPriceRange = (price: number, range?: [number, number]) =>
  !range || (price >= range[0] && price <= range[1]);

const matchesEMITenure = (product: Product, tenure?: number) => {
  if (!tenure) {
    return true;
  }

  const eligiblePlanIds = emiPlans
    .filter((plan: EMIPlan) => plan.tenure === tenure)
    .map((plan) => plan.id);

  return product.emiPlanIds.some((planId) => eligiblePlanIds.includes(planId));
};

const sortProducts = (products: Product[], sortBy?: ProductFilters['sortBy']) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case 'newest':
    default:
      return sorted;
  }
};

export const productApi = {
  fetchProducts: async (
    filters?: ProductFilters,
    page = 1,
    limit = 12,
  ): Promise<ProductListResponse> => {
    await wait(250);

    let products = readProducts();

    if (filters?.search) {
      const query = filters.search.trim().toLowerCase();
      products = products.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
      );
    }

    if (filters?.category) {
      products = products.filter((product) => product.category === filters.category);
    }

    if (filters?.priceRange) {
      products = products.filter((product) => matchesPriceRange(product.price, filters.priceRange));
    }

    products = products.filter((product) => matchesEMITenure(product, filters?.emiTenure));
    products = sortProducts(products, filters?.sortBy);

    const total = products.length;
    const startIndex = (page - 1) * limit;
    const data = products.slice(startIndex, startIndex + limit);

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
      },
    };
  },

  fetchProductById: async (id: string): Promise<ProductDetailResponse> => {
    await wait(150);

    const product = readProducts().find((entry) => entry.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      success: true,
      data: product,
    };
  },

  fetchFeaturedProducts: async (): Promise<ProductListResponse> => {
    await wait(150);

    const data = readProducts().filter((product) => product.featured);

    return {
      success: true,
      data,
      pagination: {
        page: 1,
        limit: data.length,
        total: data.length,
      },
    };
  },
};