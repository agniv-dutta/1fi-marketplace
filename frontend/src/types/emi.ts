export interface EMIPlan {
  id: string;
  tenure: number;
  interestRate: number;
  processingFee?: number;
  benefits?: string[];
}

export interface EMICalculation {
  planId: string;
  productId: string;
  productPrice: number;
  tenure: number;
  monthlyAmount: number;
  totalCost: number;
  interestRate: number;
}

export interface SelectedEMI {
  planId: string;
  monthlyAmount: number;
  tenure: number;
}
