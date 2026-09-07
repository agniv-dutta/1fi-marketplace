import { ChevronRight, Star } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatPrice, getDiscountBadgeText } from '../../utils/formatters';
import Badge from '../UI/Badge';
import Card from '../UI/Card';
import Button from '../UI/Button';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.discount ? <Badge tone="danger">{getDiscountBadgeText(product.discount)}</Badge> : null}
          {product.stock < 20 ? <Badge tone="warning">Low Stock</Badge> : null}
          <Badge tone="brand">EMI available</Badge>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                {product.category}
              </p>
              <h3 className="mt-1 min-h-[3.5rem] overflow-hidden text-lg font-semibold leading-7 text-gray-900">
                {product.name}
              </h3>
            </div>
            {typeof product.rating === 'number' ? (
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                <Star className="h-3.5 w-3.5 fill-current" />
                {product.rating.toFixed(1)}
              </div>
            ) : null}
          </div>

          <p className="mt-2 min-h-[3rem] overflow-hidden text-sm leading-6 text-gray-600">
            {product.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold text-brand-800">{formatPrice(product.price)}</p>
            {product.originalPrice && product.originalPrice > product.price ? (
              <p className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
            ) : null}
          </div>

          {product.emiPlanIds.length > 0 ? (
            <Badge tone="success">{product.emiPlanIds.length} EMI options</Badge>
          ) : null}
        </div>

        <Button fullWidth onClick={() => onSelect(product)}>
          View details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
