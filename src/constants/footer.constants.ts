import {
  Facebook,
  Instagram,
  Linkedin,
  LucideIcon,
  Twitter,
} from 'lucide-react';

export const FOOTER_CONSTANTS = {
  desc: 'Enjoy homemade flavors & chef’s signature dishes, freshly prepared every day. Order online or visit our nearest branch.',
  social_title: 'Follow on Social Media',
};

export type SocialIcon = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const SOCIAL_ICONS: SocialIcon[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    id: 'Twiter',
    label: 'Twitter',
    icon: Twitter,
  },
];

export type FooterMenu = {
  title: string;
  items: string[];
};

export const FOOTER_MENUS: FooterMenu[] = [
  {
    title: 'Explore',
    items: [
      'All Food',
      'Nearby',
      'Discount',
      'Best Seller',
      'Delivery',
      'Lunch',
    ],
  },
  {
    title: 'Help',
    items: [
      'How to Order',
      'Payment Methods',
      'Track My Order',
      'FAQ',
      'Contact Us',
    ],
  },
];
