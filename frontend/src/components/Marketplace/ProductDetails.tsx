import { useMemo } from 'react';
import type { Product } from '../../types/product';
import type { SelectedEMI } from '../../types/emi';
import { formatPrice } from '../../utils/formatters';
import Modal from '../UI/Modal';
import Badge from '../UI/Badge';
import VariantSelector from './VariantSelector';
import ProductSpecifications from './ProductSpecifications';
import EMIPlanSelector from './EMIPlanSelector';
import CheckoutCTA from './CheckoutCTA';

interface ProductDetailsProps {
  product: Product;
  selectedEMI: SelectedEMI | null;
  selectedVariants: Record<string, string>;
  onSelectEMI: (emi: SelectedEMI) => void;
  onSelectVariant: (variantId: string, value: string) => void;
  onClose: () => void;
  onProceed: () => void;
  isProcessing?: boolean;
}

const ProductDetails = ({
  product,
  selectedEMI,
  selectedVariants,
  onSelectEMI,
  onSelectVariant,
  onClose,
  onProceed,
  isProcessing = false,
}: ProductDetailsProps) => {
  const discountText = useMemo(() => {
    if (!product.originalPrice || product.originalPrice <= product.price) {
      return null;
    }

    const saved = product.originalPrice - product.price;
    return `Save ${formatPrice(saved)}`;
  }, [product.originalPrice, product.price]);

  return (
    <Modal title="Product details" onClose={onClose}>
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-gray-100 bg-gradient-to-br from-brand-50 to-white p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="overflow-hidden rounded-3xl bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge tone="brand">{product.category}</Badge>
            {product.discount ? <Badge tone="danger">{product.discount}% off</Badge> : null}
            {discountText ? <Badge tone="success">{discountText}</Badge> : null}
          </div>

          <h3 className="mt-4 font-display text-3xl font-semibold text-gray-900">{product.name}</h3>
          <p className="mt-3 text-sm leading-6 text-gray-600">{product.description}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-brand-800">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price ? (
              <span className="text-base text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            ) : null}
          </div>

          {product.variants?.length ? (
            <VariantSelector
              variants={product.variants}
              selectedVariants={selectedVariants}
              onChange={onSelectVariant}
            />
          ) : null}

          {product.specifications ? (
            <ProductSpecifications specifications={product.specifications} />
          ) : null}
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <EMIPlanSelector
            productId={product.id}
            productPrice={product.price}
            availableEMIIds={product.emiPlanIds}
            selectedPlanId={selectedEMI?.planId}
            onSelectPlan={onSelectEMI}
          />

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Checkout summary
            </h4>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Product</span>
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Price</span>
                <span className="font-medium text-gray-900">{formatPrice(product.price)}</span>
              </div>
              {Object.keys(selectedVariants).length > 0 ? (
                Object.entries(selectedVariants).map(([variantId, value]) => {
                  const variant = product.variants?.find((entry) => entry.id === variantId);
                  return (
                    <div key={variantId} className="flex items-center justify-between text-gray-600">
                      <span>{variant?.name ?? 'Variant'}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  );
                })
              ) : null}
              <div className="flex items-center justify-between text-gray-600">
                <span>EMI plan</span>
                <span className="font-medium text-gray-900">
                  {selectedEMI ? `${selectedEMI.tenure} months` : 'Not selected'}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Monthly payment</span>
                <span className="font-medium text-gray-900">
                  {selectedEMI ? formatPrice(selectedEMI.monthlyAmount) : '-'}
                </span>
              </div>
            </div>
          </div>

          <CheckoutCTA
            hasSelection={Boolean(selectedEMI)}
            isProcessing={isProcessing}
            onViewDetails={onClose}
            onProceed={onProceed}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetails;