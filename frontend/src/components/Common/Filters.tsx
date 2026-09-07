import { ChevronDown } from 'lucide-react';
import { EMI_TENURES, PRICE_FILTERS, PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../utils/constants';
import type { ProductFilters } from '../../types/product';

interface FiltersProps {
  filters: ProductFilters;
  onChange: (next: ProductFilters) => void;
}

const Filters = ({ filters, onChange }: FiltersProps) => {
  return (
    <div className="grid gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Category</span>
        <div className="relative">
          <select
            value={filters.category ?? ''}
            onChange={(event) => onChange({ ...filters, category: event.target.value || undefined })}
            className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-brand-300 focus:ring-4 focus:ring-brand-100"
          >
            <option value="">All categories</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </label>

      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Price</span>
        <div className="relative">
          <select
            value={filters.priceRange ? filters.priceRange.join('-') : ''}
            onChange={(event) => {
              if (!event.target.value) {
                onChange({ ...filters, priceRange: undefined });
                return;
              }

              const preset = PRICE_FILTERS.find((entry) => entry.value.join('-') === event.target.value);
              onChange({
                ...filters,
                priceRange: preset?.value ?? undefined,
              });
            }}
            className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-brand-300 focus:ring-4 focus:ring-brand-100"
          >
            <option value="">All prices</option>
            {PRICE_FILTERS.map((filter) => (
              <option key={filter.label} value={filter.value.join('-')}>
                {filter.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </label>

      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">EMI tenure</span>
        <div className="relative">
          <select
            value={filters.emiTenure ?? ''}
            onChange={(event) =>
              onChange({
                ...filters,
                emiTenure: event.target.value ? Number(event.target.value) : undefined,
              })
            }
            className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-brand-300 focus:ring-4 focus:ring-brand-100"
          >
            <option value="">Any tenure</option>
            {EMI_TENURES.map((tenure) => (
              <option key={tenure} value={tenure}>
                {tenure} months
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </label>

      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Sort by</span>
        <div className="relative">
          <select
            value={filters.sortBy ?? ''}
            onChange={(event) =>
              onChange({
                ...filters,
                sortBy: event.target.value ? (event.target.value as ProductFilters['sortBy']) : undefined,
              })
            }
            className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-brand-300 focus:ring-4 focus:ring-brand-100"
          >
            <option value="">Recommended</option>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </label>
    </div>
  );
};

export default Filters;
