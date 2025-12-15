import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ReviewReq } from '@/types';
import { Star } from 'lucide-react';
import React from 'react';

export const ReviewContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return <div className={cn('space-y-4 md:space-y-6', className)} {...props} />;
};

export const ReviewDialogForm = ({
  review,
  setReview,
  err,
  setErr,
}: {
  review: ReviewReq;
  setReview: React.Dispatch<React.SetStateAction<ReviewReq>>;
  err: Partial<ReviewReq>;
  setErr: React.Dispatch<React.SetStateAction<Partial<ReviewReq>>>;
}) => {
  return (
    <div className='flex-col-center w-full space-y-4 md:space-y-6'>
      <p className='text-md-extrabold'>Give Rating</p>
      <div className='flex gap-1'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            onClick={() => setReview((prev) => ({ ...prev, star: idx + 1 }))}
            className={cn(
              'cursor-pointer size-7 md:size-8 stroke-0 transition-all',
              review.star > idx ? 'fill-[#FDB022]' : 'fill-[#A4A7AE]'
            )}
          />
        ))}
      </div>
      <div className='space-y-2 w-full'>
        <Textarea
          id='comment'
          autoFocus={false}
          value={review.comment}
          onChange={(e) => {
            setReview((prev) => ({ ...prev, comment: e.target.value }));
            setErr({});
          }}
          placeholder='Please share your thoughts about our service!'
          className='min-h-[200px] max-h-96 resize-none overflow-y-auto w-full'
        />
        {err.comment && (
          <p className='text-sm text-destructive'>{err.comment}</p>
        )}
      </div>
    </div>
  );
};
