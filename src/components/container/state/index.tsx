import { Button } from '@/components/ui/button';
import { StateConfig } from '@/constants/state.constants';

type StateProps = StateConfig & {
  onAction?: () => void;
};

export const State = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: StateProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-12 space-y-4'>
      <div className='rounded-full bg-primary-100/10 p-6'>
        <Icon className='h-12 w-12 text-primary-100' />
      </div>

      <div className='text-center space-y-2'>
        <p className='font-semibold text-lg'>{title}</p>
        {description && (
          <p className='text-muted-foreground text-sm'>{description}</p>
        )}
      </div>

      {actionLabel && onAction && (
        <Button variant='outline' onClick={onAction} className='h-11'>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
