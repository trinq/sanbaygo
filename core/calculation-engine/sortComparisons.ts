import { TransportComparison, SortOption } from '../types';

export function sortComparisons(
  comparisons: TransportComparison[],
  sortBy: SortOption
): TransportComparison[] {
  const sorted = [...comparisons];

  switch (sortBy) {
    case 'cheapest':
      return sorted.sort((a, b) => a.price.value - b.price.value);

    case 'fastest':
      return sorted.sort((a, b) => a.travelTime.minutesRange.min - b.travelTime.minutesRange.min);

    case 'recommended':
    default:
      return sorted.sort((a, b) => {
        if (a.isRecommended && !b.isRecommended) return -1;
        if (!a.isRecommended && b.isRecommended) return 1;
        return 0;
      });
  }
}
