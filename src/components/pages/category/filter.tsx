import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  FilterDistanceType,
  FilterPricesType,
  FilterRatingsType,
} from '@/constants';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { ComponentProps } from 'react';

export const FilterTitle = ({ className, ...props }: ComponentProps<'h4'>) => {
  return <h4 className={cn('desc font-extrabold', className)} {...props} />;
};

export const FilterSection = ({
  title,
  children,
  ...props
}: { title?: string } & ComponentProps<'div'>) => (
  <div className={cn('px-4 space-y-2.5 pb-6')} {...props}>
    <FilterTitle>{title}</FilterTitle>
    {children}
  </div>
);

export const Filter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'space-y-6 *:border-b *:border-neutral-300 [&>*:last-child]:border-b-0',
        className
      )}
      {...props}
    />
  );
};

export const FilterCheckboxDistance = ({
  input,
  checked,
  onChange,
  id,
}: {
  id: string;
  input: FilterDistanceType;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  return (
    <div className='flex-start gap-2 py-1'>
      <Checkbox
        id={id}
        name={`distance-${input.id}`}
        checked={checked}
        onCheckedChange={onChange}
        className='size-5'
      />
      <Label
        className='text-md-regular cursor-pointer'
        htmlFor={`distance-${input.id}`}
      >
        {input.label}
      </Label>
    </div>
  );
};

export const FilterInputPrice = ({
  input,
  value,
  onChange,
  id,
}: {
  id: string;
  input: FilterPricesType;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '' || /^\d+$/.test(inputValue)) {
      onChange?.(inputValue);
    }
  };

  return (
    <div className='relative'>
      <Input
        id={id}
        name={`price-${input.id}`}
        type='text'
        value={value || ''}
        onChange={handleChange}
        className='border-neutral-300 pl-14'
        placeholder={input.label}
        inputMode='numeric'
      />
      <div className='absolute top-1/2 -translate-y-1/2 left-3 bg-neutral-100 rounded-lg size-[38px] flex-center pointer-events-none'>
        <p className='text-md-bold'>Rp</p>
      </div>
    </div>
  );
};

export const FilterCheckboxRating = ({
  input,
  checked,
  onChange,
  id,
}: {
  id: string;
  input: FilterRatingsType;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  return (
    <div className='flex-start gap-2 py-1'>
      <Checkbox
        id={id}
        name={`rating-${input.id}`}
        checked={checked}
        onCheckedChange={onChange}
        className='size-5'
      />
      <div className='flex-start gap-1'>
        <Star className='fill-[#FFAB0D] stroke-[#FFAB0D] size-5' />
        <Label className='cursor-pointer' htmlFor={`rating-${input.id}`}>
          {input.label}
        </Label>
      </div>
    </div>
  );
};
