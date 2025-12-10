import { ApiResponse } from './api.types';
import { Restaurant } from './restaurant.type';

export type Coordinates = {
  lat: number;
  long: number;
};

export type RestaurantMenu = {
  id: number;
  foodName: string;
  price: number;
  type: string; // kalau mau bisa di-union: "food" | "drink"
  image: string;
};

export type ReviewUser = {
  id: number;
  name: string;
  avatar: string | null;
};

export type RestaurantReview = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
};

export type RestaurantDetail = Omit<
  Restaurant,
  'reviewCount' | 'menuCount' | 'priceRange'
> & {
  averageRating: number;
  coordinates: Coordinates;
  totalMenus: number;
  totalReviews: number;
  menus: RestaurantMenu[];
  reviews: RestaurantReview[];
};

export type GetRestaurantDetailParams = {
  id: number; // path param
  limitMenu?: number; // query
  limitReview?: number; // query
};

export type GetRestaurantDetailResponse = ApiResponse<RestaurantDetail>;
