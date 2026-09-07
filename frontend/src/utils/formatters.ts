export const formatPrice = (price: number): string =>
  `₹${Math.round(price).toLocaleString('en-IN')}`;

export const formatPriceShort = (price: number): string => {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`;
  }

  if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K`;
  }

  return `₹${Math.round(price)}`;
};

export const calculateMonthlyEMI = (
  principal: number,
  ratePerMonth: number,
  months: number,
): number => {
  if (months <= 0) {
    return 0;
  }

  if (ratePerMonth === 0) {
    return Math.round(principal / months);
  }

  const emi =
    (principal * ratePerMonth * (1 + ratePerMonth) ** months) /
    ((1 + ratePerMonth) ** months - 1);

  return Math.round(emi);
};

export const formatPercentage = (value: number): string => `${value}%`;

export const getDiscountBadgeText = (discount?: number): string =>
  discount ? `${discount}% off` : '';
