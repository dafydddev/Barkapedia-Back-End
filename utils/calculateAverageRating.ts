export const calculateAverageRating = (
  count: number,
  previousAverage: number,
  newRating: number,
  newSafety: number
): number => {
  if (count === 1) {
    return (newRating + newSafety) / 2;
  } else {
    return ((newRating + newSafety) / 2 + previousAverage) / 2;
  }
};
