import type { ApiResponse } from '../../types/common';
import type { SelectedEMI } from '../../types/emi';

export interface CheckoutPayload {
  productId: string;
  productName: string;
  productPrice: number;
  selectedVariants: Record<string, string>;
  selectedEMI: SelectedEMI;
  timestamp: string;
}

export interface CheckoutResult {
  orderId: string;
  status: 'confirmed';
  message: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const checkoutApi = {
  initiateCheckout: async (payload: CheckoutPayload): Promise<ApiResponse<CheckoutResult>> => {
    await wait(650);

    if (!payload.selectedEMI) {
      throw new Error('Please select an EMI plan to proceed');
    }

    return {
      success: true,
      message: 'Order confirmed',
      data: {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        status: 'confirmed',
        message: `Selected ${payload.productName} with a ${payload.selectedEMI.tenure}-month EMI plan`,
      },
    };
  },
};