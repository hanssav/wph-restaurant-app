import { ICONS } from './assets.constants';

export const CATEGORY_MENU = [
  { id: 'all-restaurant', label: 'All Restaurant', icon: ICONS.ALL_FOOD },
  { id: 'nearby', label: 'Nearby', icon: ICONS.LOCATION },
  { id: 'category', label: 'Category', icon: ICONS.DISCOUNT },
  { id: 'best-seller', label: 'Best Seller', icon: ICONS.BEST_SELLER },
  { id: 'delivery', label: 'Delivery', icon: ICONS.DELIVERY },
  { id: 'lunch', label: 'Lunch', icon: ICONS.LUNCH },
] as const;

export type CategoryMenuItem = (typeof CATEGORY_MENU)[number];
export type CategoryId = CategoryMenuItem['id'];
