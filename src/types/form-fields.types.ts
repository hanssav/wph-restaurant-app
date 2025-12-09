import type { Path, FieldValues } from 'react-hook-form';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'number'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'month'
  | 'week'
  | 'file'
  | 'hidden'
  | 'textarea'
  // Custom / component types
  | 'checkbox'
  | 'switch'
  | 'radio'
  | 'select'
  | 'combobox'
  | 'multiselect'
  | 'richtext'
  | 'editor';

export type FieldConfig<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: InputType;
  placeholder?: string;
  description?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  /** Untuk checkbox/switch */
  defaultChecked?: boolean;
  /** Untuk select/options */
  options?: Array<{ value: string; label: string }>;
  /** Accept file types (khusus type="file") */
  accept?: string;
  /** Multiple files? */
  multiple?: boolean;
  /** handle toggle eye in password */
  showToggle?: boolean;
};

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

export const hasFlexibleLabel = (type: InputType): boolean => {
  return FLEXIBLE_LABEL_TYPES.has(type);
};
