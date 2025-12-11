'use client';
import { InfiniteButton, StoreCard } from '@/components/container/card-store';
import {
  ContainerWrapper,
  SectionContent,
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from '@/components/container/wrapper';
import {
  FilterMenu,
  Menus,
  MenusItems,
  RestaurantImages,
  RestaurantReviewItem,
  RestaurantReviews,
  ReviewTitle,
} from '@/components/pages/restaurant';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FILTER_MENU } from '@/constants';
import { useRestaurantDetail } from '@/hooks/use-restaurant-detail';
import { cn } from '@/lib/utils';
import { Section, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';

const RestaurantDetailPage = () => {
  const params = useParams();

  const id = Number(params.id);

  const { restaurant } = useRestaurantDetail({ id });

  console.log(restaurant, 'restaurant');

  if (!restaurant) return <div>Data not found</div>;

  const hasNextPage = true;
  return (
    <ContainerWrapper
      className={cn(
        'border-neutral-300 [&>*:last-child]:border-b-0',
        '*:border-b *:pb-4 md:*:pb-9'
      )}
    >
      <SectionWrapper className='gap-4 md:gap-8'>
        <RestaurantImages images={restaurant?.images ?? []} />
        <div className='flex-between'>
          <StoreCard
            store={restaurant}
            className='shadow-none!'
            prefix='detail'
          />
          <Button variant='outline' className='flex'>
            <Share2 className='size-5' />
            <p className='desc font-bold'>Share</p>
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader className='gap-2 md:gap-3'>
          <SectionTitle>Menu</SectionTitle>
          <FilterMenu>
            {FILTER_MENU.map((menu) => (
              <Badge key={menu.id} variant={'outline'}>
                {menu.label}
              </Badge>
            ))}
          </FilterMenu>
        </SectionHeader>
        <SectionContent>
          <Menus>
            {restaurant.menus.map((menu) => (
              <MenusItems key={menu.id} menu={menu} />
            ))}
          </Menus>
          <InfiniteButton hasNextPage={hasNextPage}>Show More</InfiniteButton>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper className='md:gap-6'>
        <SectionHeader className='gap-2 md:gap-3'>
          <SectionTitle>Review</SectionTitle>
          <ReviewTitle
            star={restaurant.star}
            totalReviews={restaurant.totalReviews}
          />
        </SectionHeader>
        <SectionContent>
          <RestaurantReviews>
            {restaurant.reviews.map((review) => (
              <RestaurantReviewItem key={review.id} review={review} />
            ))}
          </RestaurantReviews>
          <InfiniteButton hasNextPage={hasNextPage}>Show More</InfiniteButton>
        </SectionContent>
      </SectionWrapper>
    </ContainerWrapper>
  );
};

export default RestaurantDetailPage;
