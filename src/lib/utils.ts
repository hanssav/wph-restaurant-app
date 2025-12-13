import { InputType } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FLEXIBLE_LABEL_TYPES = new Set<InputType>([
  'text',
  'email',
  'password',
  'tel',
  'url',
  'search',
  'number',
  'date',
  'datetime-local',
  'time',
  'month',
  'week',
  'file',
  'textarea',
  'select',
  'combobox',
  'multiselect',
  'richtext',
  'editor',
]);

export const hasFlexibleLabel = (type: InputType = 'text'): boolean => {
  return FLEXIBLE_LABEL_TYPES.has(type);
};

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export const formatDate = (
  date: string | Date | number,
  format: string = 'D MMMM YYYY, HH:mm'
) => {
  return dayjs(date).format(format);
};

export const formatMoney = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
