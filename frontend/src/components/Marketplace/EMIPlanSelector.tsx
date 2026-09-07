import { useCallback, useEffect, useMemo, useState } from 'react';
import type { EMIPlan, EMICalculation, SelectedEMI } from '../../types/emi';
import { emiApi } from '../../services/api/emiApi';
import Button from '../UI/Button';
import EMIPlanCard from './EMIPlanCard';

interface EMIPlanSelectorProps {
  productId: string;
  productPrice: number;
  availableEMIIds: string[];
  selectedPlanId?: string;
  onSelectPlan: (selected: SelectedEMI) => void;
}

const EMIPlanSelector = ({
  productId,
  productPrice,
  availableEMIIds,
  selectedPlanId,
  onSelectPlan,
}: EMIPlanSelectorProps) => {
  const [plans, setPlans] = useState<EMIPlan[]>([]);
  const [calculations, setCalculations] = useState<Record<string, EMICalculation>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadPlans = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await emiApi.getAvailableEMIPlans(productId, availableEMIIds);

        if (cancelled) {
          return;
        }

        setPlans(response.data);

        const calculationsMap: Record<string, EMICalculation> = {};
        for (const plan of response.data) {
          calculationsMap[plan.id] = await emiApi.calculateEMI(productPrice, plan.id, productId);
        }

        if (!cancelled) {
          setCalculations(calculationsMap);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load EMI plans';
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPlans();

    return () => {
      cancelled = true;
    };
  }, [availableEMIIds, productId, productPrice, reloadKey]);

  const handleRetry = useCallback(() => setReloadKey((key) => key + 1), []);

  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => a.tenure - b.tenure),
    [plans],
  );

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700">
        <p>{error}</p>
        <div className="mt-4">
          <Button variant="secondary" onClick={handleRetry}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            EMI options
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-gray-900">
            Select an EMI plan
          </h3>
        </div>
        <p className="text-sm text-gray-500">{sortedPlans.length} plans available</p>
      </div>

      {loading ? (
        <div className="grid gap-3 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-3xl bg-gray-200" />
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">No EMI plans available</p>
          <p className="mt-1 text-xs text-gray-500">Check back later for this product.</p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {sortedPlans.map((plan) => (
            <EMIPlanCard
              key={plan.id}
              plan={plan}
              calculation={calculations[plan.id]}
              isSelected={selectedPlanId === plan.id}
              onSelect={() => {
                const calculation = calculations[plan.id];
                if (!calculation) {
                  return;
                }

                onSelectPlan({
                  planId: plan.id,
                  monthlyAmount: calculation.monthlyAmount,
                  tenure: plan.tenure,
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EMIPlanSelector;
