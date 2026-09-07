import { CheckCircle2 } from 'lucide-react';
import type { EMIPlan, EMICalculation } from '../../types/emi';
import { formatPrice } from '../../utils/formatters';
import Badge from '../UI/Badge';
import Card from '../UI/Card';

interface EMIPlanCardProps {
  plan: EMIPlan;
  calculation?: EMICalculation;
  isSelected: boolean;
  onSelect: () => void;
}

const EMIPlanCard = ({ plan, calculation, isSelected, onSelect }: EMIPlanCardProps) => {
  return (
    <Card
      className={[
        'cursor-pointer border transition duration-200',
        isSelected ? 'border-brand-700 ring-2 ring-brand-200' : 'hover:border-brand-300',
      ].join(' ')}
      onClick={onSelect}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge tone="brand">0% interest</Badge>
            <h4 className="mt-3 text-base font-semibold text-gray-900">
              {calculation ? formatPrice(calculation.monthlyAmount) : 'Calculating...'}
              <span className="ml-1 text-sm font-medium text-gray-500">/month</span>
            </h4>
            <p className="mt-1 text-sm text-gray-600">{plan.tenure} months</p>
          </div>

          <div
            className={[
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
              isSelected ? 'border-brand-700 bg-brand-700 text-white' : 'border-gray-300 text-transparent',
            ].join(' ')}
          >
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>

        {calculation ? (
          <div className="mt-4 grid gap-2 border-t border-gray-100 pt-4 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Total cost</span>
              <span className="font-semibold text-gray-900">{formatPrice(calculation.totalCost)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Interest rate</span>
              <span className="font-semibold text-gray-900">{plan.interestRate}%</span>
            </div>
            {plan.processingFee !== undefined ? (
              <div className="flex items-center justify-between text-gray-600">
                <span>Processing fee</span>
                <span className="font-semibold text-gray-900">
                  {plan.processingFee === 0 ? 'Free' : formatPrice(plan.processingFee)}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        {plan.benefits?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {plan.benefits.map((benefit) => (
              <Badge key={benefit} tone="success">
                {benefit}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default EMIPlanCard;
