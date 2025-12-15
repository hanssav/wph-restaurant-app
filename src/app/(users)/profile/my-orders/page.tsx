'use client';
import { SectionWrapper } from '@/components/container/wrapper';
import {
  CartItem,
  CartItemOrderId,
  CartItemOrderMenu,
  CartItemRestaurant,
  OrderSummary,
  OrderSummaryInfo,
} from '@/components/pages/cart';
import { FilterStatus, SearchInput } from '@/components/pages/my-orders';
import {
  ReviewContent,
  ReviewDialogForm,
} from '@/components/pages/my-orders/dialog-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { ORDER_STATUS_OPTIONS, PATH } from '@/constants';
import { useMyOrders, useAddReview } from '@/hooks';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Loader2, ShoppingBag, AlertCircle } from 'lucide-react';
import Spin from '@/components/container/spin';

const ErrorState = ({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry: () => void;
}) => {
  return (
    <div className='flex flex-col items-center justify-center py-12 space-y-4'>
      <div className='rounded-full bg-primary-100/10 p-6'>
        <AlertCircle className='h-12 w-12 text-primary-100' />
      </div>
      <div className='text-center space-y-2'>
        <p className='font-semibold text-lg'>Failed to load orders</p>
        <p className='text-muted-foreground text-sm'>
          {error?.message || 'Something went wrong. Please try again.'}
        </p>
      </div>
      <Button variant='outline' onClick={onRetry} className='mt-2'>
        Try Again
      </Button>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className='flex flex-col items-center justify-center py-12 space-y-4'>
      <div className='rounded-full bg-primary-100/10 p-6'>
        <ShoppingBag className='h-12 w-12 text-primary-100' />
      </div>
      <div className='text-center space-y-2'>
        <p className='font-semibold text-lg'>No orders yet</p>
        <p className='text-muted-foreground text-sm'>
          Your order history will appear here once you place an order
        </p>
      </div>
    </div>
  );
};

const MyOrders = () => {
  const router = useRouter();
  const { params, setSelectedStatus, queryOrders, orders } = useMyOrders();

  const {
    review,
    setReview,
    handleAddReview,
    err,
    setErr,
    addReviewMutation,
    openDialogId,
    setOpenDialogId,
    resetReview,
  } = useAddReview({ params });

  const { isLoading, isError, error } = queryOrders;

  const handleClickRestaurant = (restaurantId: number) => {
    router.push(`${PATH.RESTAURANT}/${restaurantId}`);
  };

  return (
    <SectionWrapper title='My Orders'>
      <Card className='py-4 md:py-6 rounded-2xl'>
        <CardContent className='px-4 md:px-6 space-y-5'>
          <SearchInput onChange={() => {}} />
          <FilterStatus>
            <p className='desc font-bold'>Status</p>
            {ORDER_STATUS_OPTIONS.map((opt) => (
              <Badge
                key={opt.value}
                variant={params.status === opt.value ? 'default' : 'outline'}
                onClick={() => setSelectedStatus(opt.value)}
              >
                {opt.label}
              </Badge>
            ))}
          </FilterStatus>

          {isLoading && <Spin />}
          {isError && (
            <ErrorState error={error} onRetry={() => queryOrders.refetch()} />
          )}

          {!isLoading && !isError && (!orders || orders.length === 0) && (
            <EmptyState />
          )}
          {!isLoading && !isError && orders && orders.length > 0 && (
            <>
              {orders.map((order) => (
                <CartItem key={order.id}>
                  <CartItemOrderId transactionId={order.transactionId} />

                  <div className='space-y-6'>
                    {order.restaurants.map((orderRestaurant, index) => {
                      const { restaurant, items, subtotal } = orderRestaurant;
                      const dialogId = `${order.id}-${restaurant.id}`;

                      return (
                        <div
                          key={dialogId}
                          className={cn(
                            index !== 0 && 'pt-6 border-t-2 border-neutral-200'
                          )}
                        >
                          <div className='mb-4'>
                            <CartItemRestaurant
                              restaurant={restaurant}
                              handleOnClick={() =>
                                handleClickRestaurant(restaurant.id)
                              }
                            />
                          </div>

                          <div className='space-y-4 mb-4'>
                            {items.map((item) => (
                              <CartItemOrderMenu
                                key={item.menuId}
                                item={item}
                              />
                            ))}
                          </div>

                          <OrderSummary>
                            <OrderSummaryInfo
                              restaurantName={restaurant.name}
                              subtotal={subtotal}
                            />
                            <Dialog
                              open={openDialogId === dialogId}
                              onOpenChange={(open) => {
                                setOpenDialogId(open ? dialogId : null);
                                if (!open) {
                                  resetReview();
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button className='w-full md:w-auto md:min-w-[200px]'>
                                  Give Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Give Review</DialogTitle>
                                  <VisuallyHidden>
                                    <DialogDescription>
                                      Give Review
                                    </DialogDescription>
                                  </VisuallyHidden>
                                </DialogHeader>
                                <ReviewContent>
                                  <ReviewDialogForm
                                    setErr={setErr}
                                    err={err}
                                    review={review}
                                    setReview={setReview}
                                  />
                                </ReviewContent>
                                <DialogFooter>
                                  <Button
                                    onClick={() =>
                                      handleAddReview(
                                        orderRestaurant,
                                        order.transactionId
                                      )
                                    }
                                    disabled={addReviewMutation.isPending}
                                    className='w-full'
                                  >
                                    {addReviewMutation.isPending && <Spin />}
                                    {addReviewMutation.isPending
                                      ? 'Sending...'
                                      : 'Send'}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </OrderSummary>
                        </div>
                      );
                    })}
                  </div>
                </CartItem>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </SectionWrapper>
  );
};

export default MyOrders;
