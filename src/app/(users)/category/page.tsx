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
  SectionWrapper,
} from '@/components/container/wrapper';
import {
  Filter,
  FilterCheckboxDistance,
  FilterCheckboxRating,
  FilterInputPrice,
  FilterSection,
  FilterTitle,
} from '@/components/pages/category/filter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FILTER_OPTIONS } from '@/constants';
import { useCategoryFilter, useRestaurant } from '@/hooks';
import { ListFilter } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const CategoryPage = () => {
  const {
    filter,
    handleDistanceChange,
    handleRatingChange,
    localPriceMax,
    setLocalPriceMax,
    setLocalPriceMin,
    localPriceMin,
  } = useCategoryFilter();
  const {
    error,
    handleLoadMore,
    handlePrefetchRestaurant,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    restaurants,
  } = useRestaurant({ filter });

  const { distances, prices, ratings } = FILTER_OPTIONS;

  const FilterContent = ({ idPrefix }: { idPrefix?: string }) => (
    <Filter>
      <FilterSection>
        <FilterTitle className='font-bold'>Filter</FilterTitle>
        <FilterTitle>Distance</FilterTitle>
        {distances.map((distance) => (
          <FilterCheckboxDistance
            id={`distance-${distance.id}-${idPrefix}`}
            input={distance}
            key={distance.id}
            checked={filter.range === distance.value}
            onChange={(checked) =>
              handleDistanceChange(distance.value, checked)
            }
          />
        ))}
      </FilterSection>
      <FilterSection title='Price'>
        {prices.map((price) => (
          <FilterInputPrice
            id={`price-${price.id}-${idPrefix}`}
            input={price}
            key={price.id}
            value={price.id === 'min' ? localPriceMin : localPriceMax}
            onChange={(value) => {
              if (price.id === 'min') {
                setLocalPriceMin(value);
              } else {
                setLocalPriceMax(value);
              }
            }}
          />
        ))}
      </FilterSection>
      <FilterSection title='Rating'>
        {ratings.map((rating) => (
          <FilterCheckboxRating
            id={`rating-${rating.id}-${idPrefix}`}
            input={rating}
            key={rating.id}
            checked={filter.rating === rating.value}
            onChange={(checked) => handleRatingChange(rating.value, checked)}
          />
        ))}
      </FilterSection>
    </Filter>
  );

  return (
    <ContainerWrapper>
      <SectionWrapper title='All Restaurant'>
        <SectionContent className='w-full md:flex-start items-start!'>
          <Card className='hidden md:block w-full max-w-[266px]'>
            <FilterContent idPrefix='desktop-' />
          </Card>

          <div className='md:hidden w-full'>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='secondary'
                  className='shadow-card w-full rounded-[12px] flex-between! h-14'
                >
                  <p className='font-bold desc'>Filter</p>
                  <ListFilter className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='p-4'>
                <VisuallyHidden>
                  <SheetTitle>filter store</SheetTitle>
                </VisuallyHidden>
                <FilterContent idPrefix='mobile-' />
              </SheetContent>
            </Sheet>
          </div>

          <div className='w-full'>
            {isLoading && <Spin />}
            {error && <StoreError />}
            {!isLoading && !error && restaurants.length === 0 && (
              <StoreNotFound />
            )}
            {!isLoading &&
              !error &&
              restaurants.length > 0 && [
                <StoreList
                  key='store-list'
                  className='w-full md:grid-cols-1 lg:grid-cols-2'
                >
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
          </div>
        </SectionContent>
      </SectionWrapper>
    </ContainerWrapper>
  );
};

export default CategoryPage;
