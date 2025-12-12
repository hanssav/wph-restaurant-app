import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

export const ItemCounter = ({
  count,
  onAdd,
  onRemove,
  isLoading,
}: {
  count: number;
  onAdd?: () => void;
  onRemove?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <div className='flex-start gap-4'>
      <Button
        variant='outline'
        size='icon-sm'
        className={cn('p-2', isLoading && 'disabled:opacity-100')}
        onClick={onRemove}
        disabled={isLoading}
      >
        <Minus className='size-4 stroke-neutra-950' />
      </Button>
      <p className='text-md-semibold md:text-lg-semibold'>{count}</p>
      <Button
        size={'icon-sm'}
        className={cn('p-2', isLoading && 'disabled:opacity-100')}
        onClick={onAdd}
        disabled={isLoading}
      >
        <Plus className='size-4 stroke-white' />
      </Button>
    </div>
  );
};
