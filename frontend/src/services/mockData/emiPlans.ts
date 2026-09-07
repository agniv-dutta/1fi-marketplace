import type { EMIPlan } from '../../types/emi';

export const emiPlans: EMIPlan[] = [
  {
    id: 'emi_6m',
    tenure: 6,
    interestRate: 0,
    processingFee: 0,
    benefits: ['No interest', 'Instant approval', 'No hidden charges'],
  },
  {
    id: 'emi_9m',
    tenure: 9,
    interestRate: 0,
    processingFee: 0,
    benefits: ['0% interest', 'Lower EMI', 'Instant approval'],
  },
  {
    id: 'emi_12m',
    tenure: 12,
    interestRate: 0,
    processingFee: 0,
    benefits: ['0% interest', 'Flexible payment', 'Instant approval'],
  },
  {
    id: 'emi_18m',
    tenure: 18,
    interestRate: 0,
    processingFee: 0,
    benefits: ['0% interest', 'Lower EMI', 'Instant approval'],
  },
  {
    id: 'emi_24m',
    tenure: 24,
    interestRate: 0,
    processingFee: 0,
    benefits: ['0% interest', 'Lowest EMI', 'Instant approval'],
  },
];
