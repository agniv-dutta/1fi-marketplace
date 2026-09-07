export const validatePrice = (price: number): boolean =>
  Number.isFinite(price) && price > 0;

export const validateEMITenure = (tenure: number): boolean =>
  Number.isInteger(tenure) && tenure > 0 && tenure <= 60;

export const validateProduct = (product: unknown): boolean => {
  if (!product || typeof product !== 'object') {
    return false;
  }

  const candidate = product as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number' &&
    candidate.price > 0 &&
    typeof candidate.imageUrl === 'string'
  );
};
