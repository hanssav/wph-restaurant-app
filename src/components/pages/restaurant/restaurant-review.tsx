import { Avatar } from '@/components/container/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatDate } from '@/lib/utils';
import { RestaurantDetail, RestaurantReview } from '@/types';
import { Star } from 'lucide-react';
import Image from 'next/image';

export const ReviewTitle = ({
  totalReviews,
  star,
}: Pick<RestaurantDetail, 'totalReviews' | 'star'>) => (
  <div className='flex-start gap-1 text-md-extrabold md:text-lg-extrabold'>
    <Star className='size-5 fill-[#FFAB0D] stroke-[#FFAB0D]' />
    <p className=''>{star}</p>
    <p>({totalReviews} Ulasan)</p>
  </div>
);

export const RestaurantReviews = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn('grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5', className)}
    {...props}
  />
);

export const RestaurantReviewItem = ({
  review,
}: {
  review: RestaurantReview;
}) => {
  return (
    <Card className='py-4'>
      <CardContent className='px-4 space-y-4'>
        <div className='flex-start gap-3'>
          <Avatar
            className='size-[58px] md:size-16'
            src={review.user.avatar ?? ''}
            alt={review.user.name ?? ''}
          />
          <div className=''>
            <h4 className='text-md-extrabold md:text-lg-extrabold'>
              {review.user.name}
            </h4>
            <p className='desc'>{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex-start gap-2'>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                className='size-5 fill-[#FFAB0D] stroke-[#FFAB0D]'
                key={idx}
              />
            ))}
          </div>
          <p className='desc'>{review.comment}</p>
        </div>
      </CardContent>
    </Card>
  );
};
