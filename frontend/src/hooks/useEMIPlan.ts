import { useCallback, useEffect, useState } from 'react';
import { emiApi } from '../services/api/emiApi';
import type { EMIPlan, EMICalculation, SelectedEMI } from '../types/emi';
import { calculateMonthlyEMI } from '../utils/formatters';

interface UseEMIPlanReturn {
  plans: EMIPlan[];
  loading: boolean;
  error: string | null;
  selectedPlan: SelectedEMI | null;
  emiCalculation: EMICalculation | null;
  fetchPlans: () => Promise<void>;
  selectPlan: (planId: string, productPrice: number, productId: string) => Promise<void>;
  calculateEMI: (productPrice: number, planId: string, productId: string) => Promise<void>;
}

export const useEMIPlan = (): UseEMIPlanReturn => {
  const [plans, setPlans] = useState<EMIPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SelectedEMI | null>(null);
  const [emiCalculation, setEmiCalculation] = useState<EMICalculation | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await emiApi.fetchEMIPlans();
      setPlans(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch EMI plans';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateEMI = useCallback(
    async (productPrice: number, planId: string, productId: string) => {
      setLoading(true);
      setError(null);

      try {
        const calculation = await emiApi.calculateEMI(productPrice, planId, productId);
        setEmiCalculation(calculation);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to calculate EMI';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const selectPlan = useCallback(
    async (planId: string, productPrice: number, productId: string) => {
      await calculateEMI(productPrice, planId, productId);
      const plan = plans.find((entry) => entry.id === planId);

      if (plan) {
        setSelectedPlan({
          planId,
          monthlyAmount: calculateMonthlyEMI(productPrice, 0, plan.tenure),
          tenure: plan.tenure,
        });
      }
    },
    [calculateEMI, plans],
  );

  useEffect(() => {
    void fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    loading,
    error,
    selectedPlan,
    emiCalculation,
    fetchPlans,
    selectPlan,
    calculateEMI,
  };
};
