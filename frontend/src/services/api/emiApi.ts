import { emiPlans } from '../mockData/emiPlans';
import type { EMIPlan, EMICalculation } from '../../types/emi';
import type { ApiResponse } from '../../types/common';
import { calculateMonthlyEMI } from '../../utils/formatters';

type EMIPlanResponse = ApiResponse<EMIPlan[] | EMIPlan>;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const emiApi = {
  fetchEMIPlans: async (): Promise<ApiResponse<EMIPlan[]>> => {
    await wait(180);

    return {
      success: true,
      data: emiPlans,
    };
  },

  fetchEMIPlanById: async (planId: string): Promise<EMIPlanResponse> => {
    await wait(120);

    const plan = emiPlans.find((entry) => entry.id === planId);

    if (!plan) {
      throw new Error('EMI plan not found');
    }

    return {
      success: true,
      data: plan,
    };
  },

  calculateEMI: async (
    productPrice: number,
    planId: string,
    productId: string,
  ): Promise<EMICalculation> => {
    await wait(120);

    const plan = emiPlans.find((entry) => entry.id === planId);

    if (!plan) {
      throw new Error('EMI plan not found');
    }

    const monthlyAmount = calculateMonthlyEMI(
      productPrice,
      plan.interestRate / 100 / 12,
      plan.tenure,
    );

    return {
      planId,
      productId,
      productPrice,
      tenure: plan.tenure,
      monthlyAmount,
      totalCost: monthlyAmount * plan.tenure,
      interestRate: plan.interestRate,
    };
  },

  getAvailableEMIPlans: async (
    _productId: string,
    emiPlanIds: string[],
  ): Promise<ApiResponse<EMIPlan[]>> => {
    await wait(100);

    return {
      success: true,
      data: emiPlans.filter((plan) => emiPlanIds.includes(plan.id)),
    };
  },
};
