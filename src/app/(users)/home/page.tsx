'use client';
import {
  InfiniteButton,
  StoreCard,
  StoreError,
  StoreList,
  StoreNotFound,
} from '@/components/container/card-store';
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
    <React.Fragment>
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
            {error && <StoreError />}
            {!isLoading && !error && restaurants.length === 0 && (
              <StoreNotFound />
            )}
            {!isLoading &&
              !error &&
              restaurants.length > 0 && [
                <StoreList key='store-list' className='lg:grid-cols-3'>
                  {restaurants.map((restaurant) => (
                    <StoreCard
                      key={restaurant.id}
                      store={restaurant}
                      onPrefetch={handlePrefetchRestaurant}
                    />
                  ))}
                </StoreList>,
                <InfiniteButton
                  key='infinite-btn'
                  className='w-full md:w-fit'
                  handleLoadMore={handleLoadMore}
                  isFetchingNextPage={isFetchingNextPage}
                  hasNextPage={hasNextPage}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Show More'}
                </InfiniteButton>,
              ]}
          </SectionContent>
        </SectionWrapper>
      </ContainerWrapper>
    </React.Fragment>
  );
};

export default HomePage;
