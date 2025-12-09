import { ICONS } from './assets.constants';

export type CategoryMenuItem = {
  id: number;
  label: string;
  icon: string;
};

export const CATEGORY_MENU: CategoryMenuItem[] = [
  { id: 1, label: 'All Restaurant', icon: ICONS.ALL_FOOD },
  { id: 2, label: 'Nearby', icon: ICONS.LOCATION },
  { id: 3, label: 'Discount', icon: ICONS.DISCOUNT },
  { id: 4, label: 'Best Seller', icon: ICONS.BEST_SELLER },
  { id: 5, label: 'Delivery', icon: ICONS.DELIVERY },
  { id: 6, label: 'Lunch', icon: ICONS.LUNCH },
];
