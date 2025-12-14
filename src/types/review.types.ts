import { ApiResponse } from './api.types';

export type ReviewReq = {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
  menuIds: number[];
};

type ReviewUser = {
  id: number;
  name: string;
};

export type ReviewRestaurant = {
  id: number;
  name: string;
};

export type ReviewMenu = {
  menuId: number;
  menuName: string;
  price: number;
  type: 'food' | 'drink';
  image: string;
  quantity: number;
};

export type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  transactionId: string;
  user: ReviewUser;
  restaurant: ReviewRestaurant;
  menus: ReviewMenu[];
};

export type AddReviewResponse = ApiResponse<Review>;
