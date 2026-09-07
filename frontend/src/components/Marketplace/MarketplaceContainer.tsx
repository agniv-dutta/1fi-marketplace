import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useProductFilters } from '../../hooks/useProductFilters';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import type { Product, ProductFilters } from '../../types/product';
import type { SelectedEMI } from '../../types/emi';
import { checkoutApi } from '../../services/api/checkoutApi';
import SearchBar from '../Common/SearchBar';
import Filters from '../Common/Filters';
import ProductSkeletonLoader from '../Common/ProductSkeletonLoader';
import ErrorState from '../Common/ErrorState';
import ErrorBoundary from '../Common/ErrorBoundary';
import EmptyState from '../Common/EmptyState';
import Badge from '../UI/Badge';
import ProductGrid from './ProductGrid';
import ProductDetails from './ProductDetails';

interface Notice {
  tone: 'success' | 'error';
  message: string;
}

const getInitialVariants = (product: Product): Record<string, string> => {
  if (!product.variants?.length) {
    return {};
  }

  return product.variants.reduce<Record<string, string>>((acc, variant) => {
    acc[variant.id] = variant.options[0] ?? '';
    return acc;
  }, {});
};

const MarketplaceContainer = () => {
  const { filters, setFilters, resetFilters } = useProductFilters();
  const { products, loading, error, refetch, fetchProducts } = useProducts();
  const [searchInput, setSearchInput] = useState(filters.search ?? '');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedEMI, setSelectedEMI] = useState<SelectedEMI | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const effectiveFilters: ProductFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch || undefined }),
    [filters, debouncedSearch],
  );

  const featuredCount = useMemo(
    () => products.filter((product) => product.featured).length,
    [products],
  );

  useEffect(() => {
    void fetchProducts(effectiveFilters, 1);
    setSelectedProduct(null);
    setSelectedEMI(null);
    setSelectedVariants({});
    setNotice(null);
  }, [fetchProducts, effectiveFilters]);

  const handleFilterChange = useCallback(
    (next: ProductFilters) => {
      setSearchInput(next.search ?? '');
      setFilters(next);
    },
    [setFilters],
  );

  const handleResetFilters = useCallback(() => {
    resetFilters();
    setSearchInput('');
  }, [resetFilters]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedEMI(null);
    setSelectedVariants(getInitialVariants(product));
    setNotice(null);
  };

  const handleSelectVariant = useCallback((variantId: string, value: string) => {
    setSelectedVariants((current) => ({ ...current, [variantId]: value }));
  }, []);

  const handleClose = () => {
    setSelectedProduct(null);
    setSelectedEMI(null);
    setSelectedVariants({});
  };

  const handleProceed = async () => {
    if (!selectedProduct || !selectedEMI) {
      return;
    }

    setIsProcessing(true);
    setNotice(null);

    try {
      const response = await checkoutApi.initiateCheckout({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        selectedVariants,
        selectedEMI,
        timestamp: new Date().toISOString(),
      });

      if (response.success) {
        setNotice({
          tone: 'success',
          message: `Order ${response.data.orderId} confirmed. ${response.data.message}.`,
        });
      }

      handleClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initiate checkout';
      setNotice({ tone: 'error', message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-brand-100 p-5 shadow-soft sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">1Fi Marketplace</Badge>
            <Badge tone="success">{products.length} products</Badge>
            <Badge tone="neutral">{featuredCount} featured</Badge>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold text-gray-900">
              Browse products and choose an EMI plan
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Search, filter, and compare products in a mobile-friendly marketplace designed for
              quick selection and clear EMI choices.
            </p>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by product name, category, or keyword"
          />
        </div>
      </div>

      <Filters filters={filters} onChange={handleFilterChange} />

      {notice ? (
        <div
          className={[
            'rounded-3xl border px-5 py-4 text-sm font-medium',
            notice.tone === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800',
          ].join(' ')}
        >
          {notice.message}
        </div>
      ) : null}

      {loading ? (
        <ProductSkeletonLoader columns={3} rows={2} />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="No results match your current search or filters."
          actionLabel="Reset filters"
          onAction={handleResetFilters}
        />
      ) : (
        <ErrorBoundary>
          <ProductGrid products={products} onSelectProduct={handleSelectProduct} />
        </ErrorBoundary>
      )}

      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          selectedEMI={selectedEMI}
          selectedVariants={selectedVariants}
          onSelectEMI={setSelectedEMI}
          onSelectVariant={handleSelectVariant}
          onClose={handleClose}
          onProceed={handleProceed}
          isProcessing={isProcessing}
        />
      ) : null}
    </div>
  );
};

export default MarketplaceContainer;