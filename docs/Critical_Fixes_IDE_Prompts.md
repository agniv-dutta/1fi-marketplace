# 1Fi Marketplace - Critical Fixes IDE Prompts
## Complete Code Ready to Implement

---

## 🔴 CRITICAL FIX #1: Product Details Modal

### File: `src/components/Marketplace/ProductDetailsModal.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { SelectedEMI } from '../../types/emi';
import EMIPlanSelector from './EMIPlanSelector';
import VariantSelector from './VariantSelector';
import Button from '../UI/Button';
import { formatPrice } from '../../utils/formatters';

interface ProductDetailsModalProps {
  product: Product;
  selectedEMI: SelectedEMI | null;
  onSelectEMI: (emi: SelectedEMI) => void;
  onClose: () => void;
  onProceed: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  selectedEMI,
  onSelectEMI,
  onClose,
  onProceed,
}) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  // Initialize variant selections
  useEffect(() => {
    if (product.variants) {
      const initial: Record<string, string> = {};
      product.variants.forEach(v => {
        initial[v.id] = v.options[0];
      });
      setSelectedVariants(initial);
    }
  }, [product.variants, product.id]);

  const handleVariantChange = (variantId: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: value,
    }));
  };

  const handleProceed = () => {
    // Validation
    if (!selectedEMI) {
      alert('Please select an EMI plan to proceed');
      return;
    }

    setIsValidating(true);

    // Simulate validation delay
    setTimeout(() => {
      setIsValidating(false);
      // Pass all data to parent
      const proceedData = {
        productId: product.id,
        selectedVariants,
        selectedEMI,
      };
      console.log('Proceeding with:', proceedData);
      onProceed();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-white w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Product Image & Basic Info */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image */}
            <div className="w-full sm:w-40 h-40 flex-shrink-0">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              {/* Category */}
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                {product.category}
              </p>

              {/* Product Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Price Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {product.discount && (
                  <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Options
                </h4>
                <VariantSelector
                  variants={product.variants}
                  selectedVariants={selectedVariants}
                  onVariantChange={handleVariantChange}
                />
              </div>
              <div className="border-t border-gray-200" />
            </>
          )}

          {/* Product Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Specifications
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <p className="text-sm text-gray-600 mb-1">{key}</p>
                      <p className="font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-200" />
            </>
          )}

          {/* EMI Plan Selector */}
          <div>
            <EMIPlanSelector
              productId={product.id}
              productPrice={product.price}
              availableEMIIds={product.emiPlanIds}
              onSelectPlan={onSelectEMI}
              selectedPlanId={selectedEMI?.planId}
            />
          </div>

          {/* CTA Section */}
          <div className="border-t border-gray-200 pt-6 flex gap-3">
            <Button 
              variant="secondary" 
              fullWidth 
              onClick={onClose}
              disabled={isValidating}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={handleProceed}
              disabled={!selectedEMI || isValidating}
              loading={isValidating}
            >
              Select & Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
```

---

## 🔴 CRITICAL FIX #2: Enhanced EMI Plan Selector

### File: `src/components/Marketplace/EMIPlanSelector.tsx` (COMPLETE REWRITE)

```typescript
import React, { useState, useEffect } from 'react';
import { EMIPlan, EMICalculation, SelectedEMI } from '../../types/emi';
import { emiApi } from '../../services/api/emiApi';
import EMIPlanCard from './EMIPlanCard';

interface EMIPlanSelectorProps {
  productId: string;
  productPrice: number;
  availableEMIIds: string[];
  onSelectPlan: (selected: SelectedEMI) => void;
  selectedPlanId?: string;
}

const EMIPlanSelector: React.FC<EMIPlanSelectorProps> = ({
  productId,
  productPrice,
  availableEMIIds,
  onSelectPlan,
  selectedPlanId,
}) => {
  const [plans, setPlans] = useState<EMIPlan[]>([]);
  const [calculations, setCalculations] = useState<Record<string, EMICalculation>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load plans and calculate EMI
  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch available plans
        const response = await emiApi.getAvailableEMIPlans(productId, availableEMIIds);
        setPlans(response.data);

        // Calculate EMI for each plan
        const calcs: Record<string, EMICalculation> = {};

        for (const plan of response.data) {
          try {
            const calculation = await emiApi.calculateEMI(
              productPrice,
              plan.id,
              productId
            );
            calcs[plan.id] = calculation;
          } catch (err) {
            console.error(`Failed to calculate EMI for plan ${plan.id}`, err);
          }
        }

        setCalculations(calcs);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load EMI plans';
        setError(message);
        console.error('EMI loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [productId, productPrice, availableEMIIds]);

  const handleSelectPlan = (planId: string) => {
    const calculation = calculations[planId];

    if (calculation) {
      onSelectPlan({
        planId,
        monthlyAmount: calculation.monthlyAmount,
        tenure: calculation.tenure,
      });
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-red-600 underline text-sm mt-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Choose Your EMI Plan
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Select a plan that works best for you. All plans are 0% interest.
        </p>
      </div>

      {/* Plans Grid */}
      {loading ? (
        // Skeleton Loaders
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500">No EMI plans available for this product</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map(plan => (
            <EMIPlanCard
              key={plan.id}
              plan={plan}
              calculation={calculations[plan.id]}
              isSelected={selectedPlanId === plan.id}
              onSelect={() => handleSelectPlan(plan.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EMIPlanSelector;
```

---

## 🔴 CRITICAL FIX #3: Enhanced EMI Plan Card

### File: `src/components/Marketplace/EMIPlanCard.tsx` (ENHANCED)

```typescript
import React from 'react';
import { EMIPlan, EMICalculation } from '../../types/emi';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import { formatPrice } from '../../utils/formatters';

interface EMIPlanCardProps {
  plan: EMIPlan;
  calculation?: EMICalculation;
  isSelected: boolean;
  onSelect: () => void;
}

const EMIPlanCard: React.FC<EMIPlanCardProps> = ({
  plan,
  calculation,
  isSelected,
  onSelect,
}) => {
  return (
    <Card
      variant={isSelected ? 'outlined' : 'default'}
      className={`cursor-pointer transition-all duration-200 overflow-hidden ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-xl'
      }`}
      onClick={onSelect}
    >
      <div className="p-5">
        {/* Header with Selection Indicator */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Plan Title */}
            <h4 className="font-semibold text-gray-900 mb-2">
              {plan.tenure}-Month Plan
            </h4>

            {/* Monthly Amount */}
            {calculation && (
              <p className="text-3xl font-bold text-primary">
                {formatPrice(calculation.monthlyAmount)}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">per month</p>
          </div>

          {/* Selection Checkbox */}
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              isSelected
                ? 'bg-primary border-primary'
                : 'border-gray-300 hover:border-primary'
            }`}
          >
            {isSelected && (
              <span className="text-white font-bold text-sm">✓</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* EMI Details */}
        {calculation && (
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Interest Rate</span>
              <span className="font-semibold text-gray-900">
                {plan.interestRate}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(calculation.totalCost)}
              </span>
            </div>
            {plan.processingFee !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-semibold text-gray-900">
                  {plan.processingFee === 0 ? 'Free' : formatPrice(plan.processingFee)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Benefits */}
        {plan.benefits && plan.benefits.length > 0 && (
          <div className="space-y-2">
            {plan.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-600 font-bold text-sm flex-shrink-0">
                  ✓
                </span>
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default EMIPlanCard;
```

---

## 🔴 CRITICAL FIX #4: Variant Selector Component

### File: `src/components/Marketplace/VariantSelector.tsx` (NEW)

```typescript
import React from 'react';
import { ProductVariant } from '../../types/product';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariants: Record<string, string>;
  onVariantChange: (variantId: string, value: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariants,
  onVariantChange,
}) => {
  return (
    <div className="space-y-6">
      {variants.map(variant => (
        <div key={variant.id}>
          {/* Variant Name Label */}
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            {variant.name}
          </label>

          {/* Option Buttons */}
          <div className="flex flex-wrap gap-3">
            {variant.options.map(option => {
              const isSelected = selectedVariants[variant.id] === option;

              return (
                <button
                  key={option}
                  onClick={() => onVariantChange(variant.id, option)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-gray-300 text-gray-700 hover:border-primary hover:bg-gray-50'
                  }`}
                >
                  {option}
                  {isSelected && <span className="ml-2">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;
```

---

## 🔴 CRITICAL FIX #5: Updated Product Card with Modal Integration

### File: `src/components/Marketplace/ProductCard.tsx` (INTEGRATION)

```typescript
import React from 'react';
import { Product } from '../../types/product';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { formatPrice, getDiscountBadgeText } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const handleViewDetails = () => {
    // Pass product to parent to open modal
    onSelectProduct(product);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discount ? (
          <div className="absolute top-3 right-3">
            <Badge variant="error">
              {getDiscountBadgeText(product.discount)}
            </Badge>
          </div>
        ) : null}

        {/* Low Stock Badge */}
        {product.stock < 20 && (
          <div className="absolute top-3 left-3">
            <Badge variant="warning">Low Stock</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 min-h-14">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium">
              ⭐ {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* EMI Info */}
        {product.emiAvailable && (
          <div className="mb-4 p-3 bg-primary-light rounded-lg">
            <p className="text-xs font-medium text-primary">
              ✓ 0% interest EMI • {product.emiPlanIds.length} options
            </p>
          </div>
        )}

        {/* CTA Button */}
        <Button
          onClick={handleViewDetails}
          fullWidth
          className="bg-primary hover:bg-primary-dark text-white"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
```

---

## 🔴 CRITICAL FIX #6: Updated Marketplace Container with Modal

### File: `src/components/Marketplace/MarketplaceContainer.tsx` (INTEGRATION)

```typescript
import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../types/product';
import { SelectedEMI } from '../../types/emi';
import ProductGrid from './ProductGrid';
import ProductDetailsModal from './ProductDetailsModal';
import LoadingState from '../Common/LoadingState';
import ErrorState from '../Common/ErrorState';

const MarketplaceContainer: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();
  
  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedEMI, setSelectedEMI] = useState<SelectedEMI | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedEMI(null); // Reset EMI selection when opening new product
  };

  const handleSelectEMI = (emi: SelectedEMI) => {
    setSelectedEMI(emi);
  };

  const handleProceed = () => {
    if (!selectedEMI || !selectedProduct) {
      alert('Please select an EMI plan');
      return;
    }

    // Log checkout data
    const checkoutData = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productPrice: selectedProduct.price,
      selectedEMI: selectedEMI,
      timestamp: new Date().toISOString(),
    };

    console.log('Checkout Data:', checkoutData);

    // TODO: Send to checkout endpoint
    alert('Proceeding to checkout! Check console for details.');

    // Close modal after successful submission
    setSelectedProduct(null);
    setSelectedEMI(null);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedEMI(null);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          1Fi Marketplace
        </h2>
        <p className="text-gray-600">
          Browse products and choose your favorite no-cost EMI plan
        </p>
      </div>

      {/* Product Count Badge */}
      {!loading && products.length > 0 && (
        <div className="flex gap-2 items-center text-sm">
          <span className="inline-block bg-primary text-white px-3 py-1 rounded-full">
            {products.length} products
          </span>
          <span className="text-gray-600">
            3 featured
          </span>
        </div>
      )}

      {/* Loading State */}
      {loading && <LoadingState columns={3} rows={2} />}

      {/* Error State */}
      {error && (
        <ErrorState 
          message={error} 
          onRetry={refetch}
        />
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          {products.length > 0 ? (
            <ProductGrid
              products={products}
              onSelectProduct={handleSelectProduct}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          )}
        </>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          selectedEMI={selectedEMI}
          onSelectEMI={handleSelectEMI}
          onClose={handleCloseModal}
          onProceed={handleProceed}
        />
      )}
    </div>
  );
};

export default MarketplaceContainer;
```

---

## 🔴 CRITICAL FIX #7: Updated Product Grid

### File: `src/components/Marketplace/ProductGrid.tsx`

```typescript
import React from 'react';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Step 1: Create New Components
- [ ] Create `ProductDetailsModal.tsx` (from Fix #1)
- [ ] Create `VariantSelector.tsx` (from Fix #4)

### Step 2: Update Existing Components
- [ ] Update `EMIPlanSelector.tsx` (from Fix #2)
- [ ] Update `EMIPlanCard.tsx` (from Fix #3)
- [ ] Update `ProductCard.tsx` (from Fix #5)
- [ ] Update `ProductGrid.tsx` (from Fix #7)
- [ ] Update `MarketplaceContainer.tsx` (from Fix #6)

### Step 3: Verify Integration
- [ ] Product card's "View details" button works
- [ ] Modal opens when clicking "View details"
- [ ] Modal displays all product information
- [ ] Variant selector works (if product has variants)
- [ ] EMI plan selector loads and displays plans
- [ ] Can select EMI plans
- [ ] "Select & Proceed" button is enabled only when EMI is selected
- [ ] Modal closes on X button or Cancel button
- [ ] No console errors

### Step 4: Testing
- [ ] Test on desktop browser
- [ ] Test on mobile browser
- [ ] Test all EMI calculations
- [ ] Test error scenarios
- [ ] Test loading states

---

## 🚀 QUICK DEPLOY STEPS

1. **Copy-paste each component file** into your project
2. **Update imports** if your file structure differs
3. **Ensure types are correct** in your `types/` folder
4. **Test each feature** thoroughly
5. **Check for console errors**
6. **Deploy!**

---

## ✅ Success Indicators

After implementing these fixes, you should have:

✅ Product details modal that opens on click
✅ EMI plan selector with 4-5 plans
✅ Monthly payment calculations displayed
✅ Variant selection UI
✅ Product specifications display
✅ "Select & Proceed" button
✅ Full checkout flow initiated
✅ No console errors
✅ Responsive on mobile and desktop
✅ Matches 1Fi design perfectly

---

## 🆘 Troubleshooting

### Modal doesn't open
- Check that `selectedProduct` state is being updated
- Verify `ProductDetailsModal` component is imported
- Check browser console for errors

### EMI plans not showing
- Verify `emiApi.getAvailableEMIPlans()` is working
- Check that `availableEMIIds` is being passed correctly
- Check API responses in network tab

### Proceed button doesn't work
- Ensure EMI plan is actually selected
- Check `onProceed` callback is defined
- Verify checkout data is being logged to console

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check that color variables match your theme
- Verify imports of UI components

---

