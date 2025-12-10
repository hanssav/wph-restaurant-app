'use client';
import { StoreCard, StoreList } from '@/components/container/card-store';
import Spin from '@/components/container/spin';
import {
  ContainerWrapper,
  SectionContent,
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from '@/components/container/wrapper';
import { Hero, ListCategory, ListCategoryItems } from '@/components/pages/home';
import { Button } from '@/components/ui/button';
import { CATEGORY_MENU } from '@/constants';
import { Restaurant } from '@/types';
import React from 'react';
import { useHomeData } from './use-home-data';
import { usePrefetchInfinite } from '@/lib/react-query';

const HomePage = () => {
  const {
    activeQuery,
    handleSearchFocus,
    searchQuery,
    setSearchQuery,
    setCategory,
    category,
    handlePrefetchCategory,
    handlePrefetchRestaurant,
  } = useHomeData();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = activeQuery;

  const restaurants = React.useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) => {
      if (page.success && 'restaurants' in page.data) {
        return page.data.restaurants;
      }
      return [];
    }) as Restaurant[];
  }, [data]);

  const categoryTitle = React.useMemo(() => {
    const categoryItem = CATEGORY_MENU.find((item) => item.id === category);
    return categoryItem?.label || 'Restaurants';
  }, [category]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <>
      <Hero
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchFocus={handleSearchFocus}
      />
      <ContainerWrapper>
        <ListCategory>
          {CATEGORY_MENU.map((item) => (
            <ListCategoryItems
              key={item.id}
              data={item}
              category={category}
              setCategory={setCategory}
              onPrefetch={handlePrefetchCategory}
            />
          ))}
        </ListCategory>

        <SectionWrapper>
          <SectionHeader className='justify-between'>
            <SectionTitle>{categoryTitle}</SectionTitle>
            <Button variant='ghost' className='text-primary-100'>
              See All
            </Button>
          </SectionHeader>

          <SectionContent>
            {isLoading && <Spin />}
            {error && (
              <div className='flex-center py-12'>
                <p className='text-lg text-primary-100'>
                  Failed to load restaurants. Please try again.
                </p>
              </div>
            )}
            {!isLoading && !error && restaurants.length === 0 && (
              <div className='flex-center py-12'>
                <p className='text-lg text-neutral-500'>
                  No restaurants found.
                </p>
              </div>
            )}
            {!isLoading && !error && restaurants.length > 0 && (
              <>
                <StoreList className='lg:grid-cols-3'>
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
    </>
  );
};

export default HomePage;
