import { ApiResponse } from './api.types';
import { Pagination } from './restaurant.type';

export type CheckoutItem = {
  menuId: number;
  quantity: number;
};

export type CheckoutRestaurant = {
  restaurantId: number;
  items: CheckoutItem[];
};

export type CheckoutRequestBody = {
  restaurants: CheckoutRestaurant[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes?: string;
};

// GET

export type OrderStatus =
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'done'
  | 'cancelled';

export type GetOrdersParams = {
  status?: OrderStatus | null;
  page?: number;
  limit?: number;
};

export type Order = {
  id: number;
  transactionId: string;
  status: OrderStatus;
  paymentMethod: string;
  deliveryAddress: string;
  phone: string;
  pricing: OrderPricing;
  restaurants: OrderRestaurant[];
  createdAt: string;
  updatedAt: string;
};

export type OrderPricing = {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
};

export type OrderRestaurant = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: OrderItem[];
  subtotal: number;
};

export type OrderItem = {
  menuId: number;
  menuName: string;
  price: number;
  image: string;
  quantity: number;
  itemTotal: number;
};

export type OrdersData = {
  orders: Order[];
  pagination: Pagination;
  filter: {
    status?: OrderStatus;
  };
};

export type GetOrdersResponse = ApiResponse<OrdersData>;
