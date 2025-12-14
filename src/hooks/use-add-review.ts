import { useMutation } from '@/lib/react-query';
import { reviewService } from '@/services/review.services';
import { GetOrdersParams, OrderRestaurant, ReviewReq } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

const INITIAL_REVIEW_STATE: ReviewReq = {
  star: 0,
  comment: '',
  menuIds: [],
  restaurantId: 0,
  transactionId: '',
};

export const useAddReview = ({ params }: { params: GetOrdersParams }) => {
  const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);
  const [review, setReview] = React.useState<ReviewReq>(INITIAL_REVIEW_STATE);
  const [err, setErr] = React.useState<Partial<ReviewReq>>({});

  const queryClient = useQueryClient();
  const addReviewMutation = useMutation(reviewService.add);

  const resetReview = React.useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setReview(INITIAL_REVIEW_STATE);
    setErr({});
  }, []);

  const handleAddReview = React.useCallback(
    (restaurant: OrderRestaurant, transactionId: string) => {
      setErr({});

      if (review.star === 0) {
        toast.error('Please give a star rating');
        return;
      }

      if (!review.comment.trim()) {
        setErr({ comment: 'Please write your review' });
        return;
      }

      const req: ReviewReq = {
        ...review,
        transactionId,
        restaurantId: restaurant.restaurant.id,
        menuIds: restaurant.items.map((item) => item.menuId),
      };

      addReviewMutation.mutate(req, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['restaurant'],
            type: 'all',
          });
          queryClient.invalidateQueries({ queryKey: ['my-orders', params] });

          toast.success('Thank you! Your review has been submitted.');

          setOpenDialogId(null);
          resetReview();
        },
      });
    },
    [review, addReviewMutation, queryClient, params, resetReview]
  );

  const returnValue = React.useMemo(
    () => ({
      review,
      setReview,
      handleAddReview,
      err,
      setErr,
      addReviewMutation,
      openDialogId,
      setOpenDialogId,
      resetReview,
    }),
    [review, handleAddReview, err, addReviewMutation, openDialogId, resetReview]
  );

  return returnValue;
};
