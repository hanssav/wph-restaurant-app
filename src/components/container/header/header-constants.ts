import { MapPin, Package, LogOut } from 'lucide-react';

export const PROFILE_MENU = [
  {
    label: 'Delivery Address',
    icon: MapPin,
    href: '/delivery-address',
    className: 'hover:!text-white hover:!bg-primary-100',
  },
  {
    label: 'My Orders',
    icon: Package,
    href: '/orders',
    className: 'hover:!text-white hover:!bg-primary-100',
  },
  {
    label: 'Logout',
    icon: LogOut,
    href: '/logout',
    iconClassname: 'w-4 h-4 group-hover:text-white group-hover:stroke-white',
    className:
      'text-primary-100 hover:text-white font-semibold hover:!text-white hover:!bg-primary-100 hover:stroke-white',
  },
];
