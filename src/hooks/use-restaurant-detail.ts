import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/services';
import {
  GetRestaurantDetailParams,
  GetRestaurantDetailResponse,
} from '@/types';
import { keepPreviousData } from '@tanstack/react-query';
import React from 'react';
import { FilterMenuId } from '@/constants';

export const useRestaurantDetail = ({ id }: { id: number }) => {
  const LIMIT_DATA = 20;
  const [displayLimit, setDisplayLimit] = React.useState(LIMIT_DATA);
  const [menuType, setMenuType] = React.useState<FilterMenuId>('all');

  const [params, setParams] = React.useState<GetRestaurantDetailParams>({
    id,
    limitMenu: 50, // fetch max menus for filtering
    limitReview: LIMIT_DATA,
  });

  const { data, isLoading } = useQuery<GetRestaurantDetailResponse>({
    queryKey: ['restaurant', id, params],
    queryFn: () => restaurantService.getId(params),
    placeholderData: keepPreviousData,
  });

  const restaurant = React.useMemo(() => {
    if (!isLoading && data && data.success) {
      const restaurantData = data.data;

      const filteredMenus =
        menuType === 'all'
          ? restaurantData.menus
          : restaurantData.menus.filter((menu) => menu.type === menuType);

      const displayedMenus = filteredMenus.slice(0, displayLimit);

      return {
        ...restaurantData,
        menus: displayedMenus,
        totalFilteredMenus: filteredMenus.length,
      };
    }
    return undefined;
  }, [data, isLoading, menuType, displayLimit]);

  const hasNextMenus = React.useMemo<boolean>(() => {
    if (!restaurant?.totalMenus) return false;
    return (params.limitMenu ?? 0) < restaurant.totalMenus;
  }, [restaurant?.totalMenus, params.limitMenu]);

  const handleFetchNextMenus = React.useCallback(() => {
    setParams((prev) => ({
      ...prev,
      limitMenu: (prev.limitMenu ?? 0) + LIMIT_DATA,
    }));
  }, []);

  const hasNextReviews = React.useMemo<boolean>(() => {
    if (!restaurant?.totalReviews) return false;

    return (params.limitReview ?? 0) < restaurant.totalReviews;
  }, [restaurant?.totalReviews, params.limitReview]);

  const handleFetchNextReviews = React.useCallback(() => {
    setParams((prev) => ({
      ...prev,
      limitReview: (prev.limitReview ?? 0) + LIMIT_DATA,
    }));
  }, []);

  const handleFilterMenuType = React.useCallback((type: FilterMenuId) => {
    setMenuType(type);
    setDisplayLimit(LIMIT_DATA);
  }, []);

  console.log(menuType, 'menutype');

  return {
    restaurant,
    hasNextMenus,
    handleFetchNextMenus,
    isLoading,
    hasNextReviews,
    handleFetchNextReviews,
    handleFilterMenuType,
    menuType,
  };
};
