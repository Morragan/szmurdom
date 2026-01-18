'use server';

export const parseOffersParam = async (
  offersParam: string | string[] | undefined,
): Promise<number[]> => {
  if (!offersParam) return [];
  const offersStr = Array.isArray(offersParam) ? offersParam[0] : offersParam;
  // in case of malformed URL, only take first two offers
  return offersStr
    .split(',')
    .slice(0, 2)
    .map((idStr) => parseInt(idStr, 10));
};
