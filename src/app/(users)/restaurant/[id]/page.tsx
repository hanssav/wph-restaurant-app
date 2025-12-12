'use client';
import { InfiniteButton, StoreCard } from '@/components/container/card-store';
import { CheckoutAction } from '@/components/container/checkout-action';
import Spin from '@/components/container/spin';
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
import { useCartActions, useRestaurantDetail } from '@/hooks';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';

const RestaurantDetailPage = () => {
  const params = useParams();
  const id = Number(params.id);

  const {
    restaurant,
    handleFetchNextMenus,
    hasNextMenus,
    isLoading,
    handleFetchNextReviews,
    hasNextReviews,
    handleFilterMenuType,
    menuType,
  } = useRestaurantDetail({ id });

  const {
    menusInCart,
    getMenuQuantity,
    isMenuLoading,
    handleAddCart,
    handleRemoveCart,
  } = useCartActions({
    restaurantId: id,
    restaurant: restaurant
      ? {
          id: restaurant.id,
          logo: restaurant.logo,
          name: restaurant.name,
          menus: restaurant.menus,
        }
      : undefined,
  });

  if (isLoading) return <Spin />;
  if (!restaurant) return <div>Data not found</div>;

  return [
    <ContainerWrapper
      key={'page-content'}
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
        <SectionHeader className='gap-4 md:gap-8'>
          <SectionTitle>Menu</SectionTitle>
          <FilterMenu>
            {FILTER_MENU.map((menu) => (
              <Badge
                key={menu.id}
                variant={menuType === menu.id ? 'default' : 'outline'}
                onClick={() => handleFilterMenuType(menu.id)}
              >
                <p className='text-md font-semibold md:font-bold'>
                  {menu.label}
                </p>
              </Badge>
            ))}
          </FilterMenu>
        </SectionHeader>
        <SectionContent>
          <Menus>
            {restaurant.menus.map((menu) => (
              <MenusItems
                key={menu.id}
                menu={menu}
                onAdd={() => handleAddCart(menu.id)}
                menusInCart={menusInCart}
                onRemove={() => handleRemoveCart(menu.id)}
                isLoading={isMenuLoading(menu.id)}
              />
            ))}
          </Menus>
          <InfiniteButton
            hasNextPage={hasNextMenus}
            isFetchingNextPage={isLoading}
            handleLoadMore={handleFetchNextMenus}
            label='Show More'
          />
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
          <InfiniteButton
            hasNextPage={hasNextReviews}
            isFetchingNextPage={isLoading}
            handleLoadMore={handleFetchNextReviews}
            label='Show More'
          />
        </SectionContent>
      </SectionWrapper>
    </ContainerWrapper>,

    <CheckoutAction key={'page-footer'} />,
  ];
};

export default RestaurantDetailPage;
