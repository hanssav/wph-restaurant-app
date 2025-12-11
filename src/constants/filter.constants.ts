export const FILTER_OPTIONS = {
  distances: [
    { id: '10', label: 'Nearby', value: 10 },
    { id: '1', label: 'Within 1 km', value: 1 },
    { id: '3', label: 'Within 3 km', value: 3 },
    { id: '5', label: 'Within 5 km', value: 5 },
  ],
  prices: [
    { id: 'min', label: 'Minimum Price', placeholder: 'Rp' },
    { id: 'max', label: 'Maximum Price', placeholder: 'Rp' },
  ],
  ratings: [
    { id: '5', label: '5', value: 5 },
    { id: '4', label: '4', value: 4 },
    { id: '3', label: '3', value: 3 },
    { id: '2', label: '2', value: 2 },
    { id: '1', label: '1', value: 1 },
  ],
};

export type FilterDistanceType = (typeof FILTER_OPTIONS.distances)[number];

export type FilterPricesType = (typeof FILTER_OPTIONS.prices)[number];

export type FilterRatingsType = (typeof FILTER_OPTIONS.ratings)[number];

export const FILTER_MENU = [
  {
    id: 'all',
    label: 'All Menu',
  },
  {
    id: 'food',
    label: 'Food',
  },
  {
    id: 'drink',
    label: 'Drink',
  },
] as const;

export type FilterMenuId = (typeof FILTER_MENU)[number]['id'];
