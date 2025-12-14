import { apiInstance } from '@/lib/api';
import { AddReviewResponse, ReviewReq } from '@/types';

export const reviewService = {
  add: async (req: ReviewReq): Promise<AddReviewResponse> => {
    const { data } = await apiInstance.post<AddReviewResponse>('/review', req);
    return data;
  },
};
