'use client';
import {
  InfiniteButton,
  StoreCard,
  StoreList,
} from '@/components/container/card-store';
import { Spin } from '@/components/container/spin';
import { State } from '@/components/container/state';
import {
  ContainerWrapper,
  SectionContent,
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from '@/components/container/wrapper';
import { Hero, ListCategory, ListCategoryItems } from '@/components/pages/home';
import { Button } from '@/components/ui/button';
import { CATEGORY_MENU, PATH } from '@/constants';
import { STATE_CONFIG } from '@/constants/state.constants';
import { useHomeData } from '@/hooks';
import { Restaurant } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react';

const HomePage = () => {
  const router = useRouter();
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
          <SectionHeader className='flex-between!'>
            <SectionTitle>{categoryTitle}</SectionTitle>
            <Button
              variant='ghost'
              className='text-primary-100'
              onClick={() => router.push(PATH.CATEGORY)}
            >
              See All
            </Button>
          </SectionHeader>

          <SectionContent>
            {isLoading && <Spin />}
            {error && (
              <State
                {...STATE_CONFIG.store.error}
                onAction={() => activeQuery.refetch()}
              />
            )}
            {!isLoading && !error && restaurants.length === 0 && (
              <State {...STATE_CONFIG.store.empty} />
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
