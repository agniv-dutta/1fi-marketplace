import type { ProductVariant } from '../../types/product';
import Button from '../UI/Button';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariants: Record<string, string>;
  onChange: (variantId: string, value: string) => void;
}

const VariantSelector = ({ variants, selectedVariants, onChange }: VariantSelectorProps) => {
  return (
    <div className="mt-8 space-y-5">
      <div className="border-t border-gray-200 pt-5">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
          Available variants
        </h4>
      </div>
      {variants.map((variant) => (
        <div key={variant.id}>
          <p className="mb-3 text-sm font-medium text-gray-700">{variant.name}</p>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const selected = selectedVariants[variant.id] === option;
              return (
                <Button
                  key={option}
                  variant={selected ? 'primary' : 'secondary'}
                  onClick={() => onChange(variant.id, option)}
                  className="rounded-full px-4 py-2 text-sm"
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;