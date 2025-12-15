import { PATH } from '@/constants';
import { MapPin, Package, LogOut, User } from 'lucide-react';

export const PROFILE_MENU = [
  {
    label: 'Profile',
    icon: User,
    href: PATH.PROFILE,
  },
  {
    label: 'Delivery Address',
    href: PATH.DELIVERY,
    icon: MapPin,
  },
  {
    label: 'My Orders',
    icon: Package,
    href: PATH.MY_ORDERS,
  },
  {
    label: 'Logout',
    icon: LogOut,
    href: 'logout',
  },
];
