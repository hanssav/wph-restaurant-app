import type { Control, FieldValues } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { FieldConfig } from '@/types';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { cn, hasFlexibleLabel } from '@/lib/utils';

type Props<T extends FieldValues> = {
  control: Control<T>;
  config: FieldConfig<T>;
};

export const FormFields = <T extends FieldValues>({
  control,
  config,
}: Props<T>) => {
  const { type, placeholder, autoComplete, disabled, showToggle, label } =
    config;
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const fieldId = React.useId();

  return (
    <FormField
      control={control}
      name={config.name}
      render={({ field }) => {
        const hasValue =
          field.value !== undefined &&
          field.value !== null &&
          field.value !== '';
        const shouldFloat = isFocused || hasValue;

        let InputComponent: React.ReactNode = null;

        switch (type) {
          case 'textarea':
            InputComponent = (
              <Textarea
                id={fieldId}
                placeholder={shouldFloat ? placeholder : ''}
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='min-h-[100px] max-h-96 resize-none overflow-y-auto pt-6'
              />
            );
            break;

          case 'number':
            InputComponent = (
              <Input
                id={fieldId}
                type='number'
                placeholder={shouldFloat ? placeholder : ''}
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                className='pt-6 pb-2'
              />
            );
            break;

          case 'file':
            InputComponent = (
              <Input
                id={fieldId}
                type='file'
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                className='pt-6 pb-2'
              />
            );
            break;

          case 'tel':
            InputComponent = (
              <Input
                id={fieldId}
                type='tel'
                placeholder={shouldFloat ? placeholder : ''}
                autoComplete={autoComplete}
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='pt-6 pb-2'
              />
            );
            break;

          case 'email':
            InputComponent = (
              <Input
                id={fieldId}
                type='email'
                placeholder={shouldFloat ? placeholder : ''}
                autoComplete={autoComplete}
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='pt-6 pb-2'
              />
            );
            break;

          case 'password':
            InputComponent = (
              <div className='relative'>
                <Input
                  id={fieldId}
                  type={showToggle && showPassword ? 'text' : 'password'}
                  placeholder={shouldFloat ? placeholder : ''}
                  autoComplete={autoComplete}
                  {...field}
                  value={field.value ?? ''}
                  disabled={disabled}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className='pr-10 pt-6 pb-2'
                />
                {showToggle && (
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                    tabIndex={-1}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <Eye className='h-4 w-4' />
                    ) : (
                      <EyeOff className='h-4 w-4' />
                    )}
                  </button>
                )}
              </div>
            );
            break;

          case 'checkbox':
            InputComponent = (
              <div className='flex items-center gap-2'>
                <Checkbox
                  id={fieldId}
                  name={field.name}
                  disabled={disabled}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label
                  htmlFor={fieldId}
                  className='text-md-regular cursor-pointer'
                >
                  {label}
                </Label>
              </div>
            );
            break;

          case 'text':
          default:
            InputComponent = (
              <Input
                id={fieldId}
                type={type}
                placeholder={shouldFloat ? placeholder : ''}
                autoComplete={autoComplete}
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='pt-6 pb-2'
              />
            );
            break;
        }

        const isFlexibleLabel = hasFlexibleLabel(type);

        return (
          <FormItem
            className={cn(
              isFlexibleLabel && 'relative overflow-visible transition-all'
            )}
          >
            {isFlexibleLabel && label && (
              <FormLabel
                htmlFor={fieldId}
                className={cn(
                  'absolute left-3 pointer-events-none transition-all duration-200 ease-in-out',
                  shouldFloat
                    ? 'top-1.5 text-xs text-neutral-600 font-medium'
                    : 'top-1/2 -translate-y-1/2 text-sm md:text-base text-neutral-500'
                )}
              >
                {config.label}
              </FormLabel>
            )}
            <FormControl>{InputComponent}</FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
