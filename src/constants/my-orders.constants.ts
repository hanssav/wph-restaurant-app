import { OrderStatus } from '@/types';

export const ORDER_STATUS_OPTIONS: {
  label: string;
  value: OrderStatus;
}[] = [
  {
    label: 'Preparing',
    value: 'preparing',
  },
  {
    label: 'On the Way',
    value: 'on_the_way',
  },
  {
    label: 'Delivered',
    value: 'delivered',
  },
  {
    label: 'Done',
    value: 'done',
  },
  {
    label: 'Canceled',
    value: 'cancelled',
  },
];
