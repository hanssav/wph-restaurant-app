import { GetRestaurantParams } from '@/types';
import React from 'react';

export const useCategoryFilter = () => {
  const [filter, setFilter] = React.useState<GetRestaurantParams>({
    page: 1,
    limit: 10,
  });

  const [localPriceMin, setLocalPriceMin] = React.useState('');
  const [localPriceMax, setLocalPriceMax] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prev) => {
        const newFilter = { ...prev };
        if (localPriceMin) {
          newFilter.priceMin = parseFloat(localPriceMin);
        } else {
          delete newFilter.priceMin;
        }
        return newFilter;
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [localPriceMin]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prev) => {
        const newFilter = { ...prev };
        if (localPriceMax) {
          newFilter.priceMax = parseFloat(localPriceMax);
        } else {
          delete newFilter.priceMax;
        }
        return newFilter;
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [localPriceMax]);

  const handleDistanceChange = (distance: number, checked: boolean) => {
    setFilter((prev) => ({
      ...prev,
      range: checked ? distance : undefined,
      page: 1,
    }));
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    setFilter((prev) => ({
      ...prev,
      rating: checked ? rating : undefined,
      page: 1,
    }));
  };

  return {
    filter,
    handleDistanceChange,
    localPriceMax,
    setLocalPriceMax,
    setLocalPriceMin,
    handleRatingChange,
    localPriceMin,
  };
};
