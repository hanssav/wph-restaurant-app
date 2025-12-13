export const BANKS = [
  {
    id: 'bca',
    name: 'Bank Central Asia',
    icon: '/icons/bank-bca.png',
  },
  {
    id: 'bni',
    name: 'Bank Negara Indonesia',
    icon: '/icons/bank-bni.png',
  },
  {
    id: 'bri',
    name: 'Bank Rakyat Indonesia',
    icon: '/icons/bank-bri.png',
  },
  {
    id: 'mandiri',
    name: 'Bank Mandiri',
    icon: '/icons/bank-mandiri.png',
  },
] as const;

export type BankId = (typeof BANKS)[number]['id'];
export type BankName = (typeof BANKS)[number]['name'];

export const PAYMENT_SUMMARY = [
  {
    id: 'price',
    label: 'Price',
    sufix: '',
    value: '',
  },
  {
    id: 'delivery_fee',
    label: 'Delivery Fee',
    value: '',
  },
  {
    id: 'service_fee',
    label: 'Service Fee',
    value: '',
  },
  {
    id: 'total',
    label: 'Total',
    value: '',
  },
];

export type PayemnetSummary = (typeof PAYMENT_SUMMARY)[number];

export type CheckoutAddressType = {
  deliveryAddress: string;
  phone: string;
  label: string;
};

export const deffaultAddress: CheckoutAddressType = {
  label: 'Delivery Address',
  deliveryAddress: 'Jl. Sudirman No. 25, Jakarta Pusat, 10220',
  phone: '0812-3456-7890',
};
