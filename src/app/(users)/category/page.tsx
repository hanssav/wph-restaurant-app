'use client';
import { StoreCard, StoreList } from '@/components/container/card-store';
import Spin from '@/components/container/spin';
import {
  ContainerWrapper,
  SectionContent,
  SectionWrapper,
} from '@/components/container/wrapper';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useInfiniteQuery, usePrefetch } from '@/lib/react-query';
import { restaurantService } from '@/services';
import { GetRestaurantParams, GetRestaurantsResponse } from '@/types';
import React from 'react';

const CategoryPage = () => {
  const [filter, setFilter] = React.useState<GetRestaurantParams>({
    page: 1,
    limit: 10,
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GetRestaurantsResponse, GetRestaurantParams>(
    ['restaurants', 'all', filter],
    restaurantService.getAll,
    filter
  );

  const restaurants = React.useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) => {
      if (page.success && 'restaurants' in page.data) {
        return page.data.restaurants;
      }
      return [];
    });
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const prefetch = usePrefetch();

  const handlePrefetchRestaurant = React.useCallback(
    (restoId: number) => {
      prefetch(
        ['restaurant', restoId],
        () => restaurantService.getId({ id: restoId }),
        { staleTime: 1000 * 60 }
      );
    },
    [prefetch]
  );

  return (
    <ContainerWrapper>
      <SectionWrapper title='All Restaurant'>
        {/* as Sidebar */}

        <SectionContent className='w-full md:flex-start items-start!'>
          <Card className='hidden md:block w-full max-w-[266px]'>sidebar</Card>
          {isLoading && <Spin />}
          {error && (
            <div className='flex-center py-12'>
              <p className='text-lg text-primary-100'>
                Failed to load restaurants. Please try again.
              </p>
            </div>
          )}
          {!isLoading && !error && restaurants.length === 0 && (
            <div className='flex-center py-12 w-full'>
              <p className='text-lg text-neutral-500'>No restaurants found.</p>
            </div>
          )}
          {!isLoading && !error && restaurants.length > 0 && (
            <>
              <StoreList className='w-full'>
                {restaurants.map((restaurant) => (
                  <StoreCard
                    key={restaurant.id}
                    store={restaurant}
                    onPrefetch={handlePrefetchRestaurant}
                  />
                ))}
              </StoreList>
              {hasNextPage && (
                <div className='w-full flex-center mt-6'>
                  <Button
                    variant='outline'
                    className='w-full md:w-fit'
                    onClick={handleLoadMore}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? 'Loading...' : 'Show More'}
                  </Button>
                </div>
              )}
            </>
          )}
        </SectionContent>
      </SectionWrapper>
    </ContainerWrapper>
  );
};

export default CategoryPage;
