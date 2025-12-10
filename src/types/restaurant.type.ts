import { ApiResponse } from './api.types';

export type Restaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
};

export type PriceRange = {
  min: number;
  max: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Filters = {
  range: number | null;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  category: string | null;
};

export type RestaurantData = {
  restaurants: Restaurant[];
  pagination: Pagination;
  filters: Filters;
};

export type RestoParams = { q?: string } & Pick<Pagination, 'page' | 'limit'>;

// === GET ALL RESTAURANTS ===

export type GetRestaurantParams = {
  location?: string; // Location to search restaurants
  range?: number; // Search range in KM
  priceMin?: number; // Minimum price filter
  priceMax?: number; // Maximum price filter
  rating?: number; // Minimum rating filter
  category?: string; // Category/cuisine
  page?: number; // Page number
  limit?: number; // Items per page
};

export type GetRestaurantsResponse = ApiResponse<RestaurantData>;

// === GET RESTO BEST SELLER ===

export type GetRestoBestSellerResponse = ApiResponse<{
  restaurants: Restaurant[];
  pagination: Pagination;
}>;

export type GetRestoResponse = ApiResponse<{
  restaurants: Restaurant[];
  pagination: Pagination;
}>;
