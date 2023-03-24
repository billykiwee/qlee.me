const n = 2984943.123;
export const formatNumber = (num) => {
  if (num % 1 === 0) return num.toLocaleString();

  return num.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
