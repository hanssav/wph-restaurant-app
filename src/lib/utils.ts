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
