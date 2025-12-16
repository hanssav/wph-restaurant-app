import { LucideIcon, Store } from 'lucide-react';

export type StateVariant = 'error' | 'empty';

export type StateConfig = {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
};

import { AlertCircle, ShoppingBag, ShoppingCart } from 'lucide-react';

export const STATE_CONFIG = {
  order: {
    error: {
      icon: AlertCircle,
      title: 'Failed to load orders',
      description: 'Something went wrong. Please try again.',
      actionLabel: 'Try Again',
    },
    empty: {
      icon: ShoppingBag,
      title: 'No orders yet',
      description:
        'Your order history will appear here once you place an order',
    },
  },

  cart: {
    empty: {
      icon: ShoppingCart,
      title: 'Your cart is empty',
      description: 'Add items to your cart to start ordering',
    },
  },
  store: {
    error: {
      icon: AlertCircle,
      title: 'Failed to load restaurants',
      description: 'Please try again.',
      actionLabel: 'Try Again',
    },
    empty: {
      icon: Store,
      title: 'No restaurants found',
      description: 'Try adjusting your filters or search keyword',
    },
  },
} satisfies Record<string, Record<string, StateConfig>>;
