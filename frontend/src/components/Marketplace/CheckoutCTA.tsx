import { ArrowRight } from 'lucide-react';
import Button from '../UI/Button';

interface CheckoutCTAProps {
  hasSelection: boolean;
  isProcessing: boolean;
  onViewDetails: () => void;
  onProceed: () => void;
}

const CheckoutCTA = ({
  hasSelection,
  isProcessing,
  onViewDetails,
  onProceed,
}: CheckoutCTAProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button variant="secondary" fullWidth onClick={onViewDetails}>
        View details
      </Button>
      <Button fullWidth onClick={onProceed} disabled={!hasSelection || isProcessing}>
        {isProcessing ? 'Processing...' : 'Select & Proceed'}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CheckoutCTA;
