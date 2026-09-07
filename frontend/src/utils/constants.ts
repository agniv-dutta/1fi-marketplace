export const EMI_TENURES = [6, 9, 12, 18, 24] as const;

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty',
  'Books',
  'Sports',
] as const;

export const SORT_OPTIONS = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
] as const;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

export const ITEMS_PER_PAGE = 12;

export const PRICE_FILTERS = [
  { label: 'Under ₹25k', value: [0, 25000] as [number, number] },
  { label: '₹25k - ₹50k', value: [25000, 50000] as [number, number] },
  { label: '₹50k - ₹1L', value: [50000, 100000] as [number, number] },
  { label: 'Above ₹1L', value: [100000, Number.MAX_SAFE_INTEGER] as [number, number] },
] as const;
