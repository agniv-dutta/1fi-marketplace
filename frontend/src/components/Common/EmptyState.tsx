import { PackageSearch } from 'lucide-react';
import type { ReactNode } from 'react';
import Button from '../UI/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

const EmptyState = ({
  title = 'No products found',
  description = 'Try adjusting search, filters, or sort options to surface more items.',
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) => {
  return (
    <div className="grid min-h-[320px] place-items-center rounded-3xl border border-dashed border-gray-300 bg-white/80 px-6 py-14 text-center shadow-soft">
      <div className="max-w-sm">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand-50 text-brand-700">
          {icon ?? <PackageSearch className="h-7 w-7" />}
        </div>
        <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        {actionLabel && onAction ? (
          <div className="mt-6">
            <Button variant="secondary" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmptyState;