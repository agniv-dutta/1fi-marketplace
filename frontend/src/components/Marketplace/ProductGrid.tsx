import type { Product } from '../../types/product';
import EmptyState from '../Common/EmptyState';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductGrid = ({ products, onSelectProduct }: ProductGridProps) => {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
      ))}
    </div>
  );
};

export default ProductGrid;