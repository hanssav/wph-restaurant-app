'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IMAGES, PATH } from '@/constants';
import { formatDate, formatMoney } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

type SummaryItem = {
  id: string;
  label: string;
  value: string;
};

const generateRandomFee = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const TicketNotch = ({ position }: { position: 'left' | 'right' }) => (
  <div
    className={`absolute ${
      position === 'left' ? '-left-9' : '-right-9'
    } bottom-0 translate-y-1/2 w-8 h-8 bg-neutral-50 rounded-full z-10`}
  />
);

const SuccessIcon = () => (
  <div className='flex items-center justify-center size-16 rounded-full bg-[#44AB09]'>
    <Check className='size-12 stroke-white' />
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className='flex-between'>
    <p className='desc'>{label}</p>
    <p className='desc font-bold'>{value}</p>
  </div>
);

const DashedSection = ({ children }: { children: React.ReactNode }) => (
  <div className='relative border-b border-dashed border-neutral-300'>
    <div className='space-y-4 md:space-y-5 pb-4 md:pb-5'>{children}</div>
    <TicketNotch position='left' />
    <TicketNotch position='right' />
  </div>
);

const useCheckoutSuccess = () => {
  const checkout = useAppSelector((state: RootState) => state.cart.checkout);
  const router = useRouter();

  const deliveryFee = React.useMemo(() => {
    if (!checkout?.totalPrice) return 0;
    return generateRandomFee(10_000, 50_000);
  }, [checkout?.totalPrice]);

  const serviceFee = React.useMemo(() => {
    if (!checkout?.totalPrice) return 0;
    return generateRandomFee(1_000, 10_000);
  }, [checkout?.totalPrice]);

  const checkoutSummary: SummaryItem[] = React.useMemo(() => {
    if (!checkout) return [];

    return [
      {
        id: 'date',
        label: 'Date',
        value: formatDate(checkout.date),
      },
      {
        id: 'payment',
        label: 'Payment Method',
        value: checkout.bankName,
      },
      {
        id: 'price',
        label: `Price (${checkout.totalItems} items)`,
        value: formatMoney(checkout.totalPrice),
      },
      {
        id: 'delivery',
        label: 'Delivery Fee',
        value: formatMoney(deliveryFee),
      },
      {
        id: 'service',
        label: 'Service Fee',
        value: formatMoney(serviceFee),
      },
    ];
  }, [checkout, deliveryFee, serviceFee]);

  const totalPayment = React.useMemo(() => {
    if (!checkout) return 0;
    return checkout.totalPrice + deliveryFee + serviceFee;
  }, [checkout, deliveryFee, serviceFee]);

  const handleNavigateToOrders = () => router.push(PATH.MY_ORDERS);

  return {
    checkout,
    checkoutSummary,
    totalPayment,
    handleNavigateToOrders,
  };
};

const CheckoutSuccess = () => {
  const { checkout, checkoutSummary, totalPayment, handleNavigateToOrders } =
    useCheckoutSuccess();

  if (!checkout) {
    toast.info('Oops! No order to show. Start shopping first!');
    return redirect(PATH.HOME);
  }

  return (
    <div className='min-h-screen min-w-screen bg-neutral-50 flex justify-center'>
      <div className='w-full max-w-[500px] px-6 py-7 flex-col-center gap-5'>
        <div className='relative overflow-hidden w-[149px] h-[42px]'>
          <Image src={IMAGES.LOGO} alt='logo' fill className='object-cover' />
        </div>

        <Card className='w-full'>
          <CardContent className='space-y-4 md:space-y-5'>
            <DashedSection>
              <div className='space-y-0.5 flex-col-center'>
                <SuccessIcon />
                <h4 className='text-lg-extrabold md:text-xl-extrabold'>
                  Payment Success
                </h4>
                <p className='desc'>
                  Your payment has been successfully processed.
                </p>
              </div>
            </DashedSection>

            <DashedSection>
              {checkoutSummary.map((item) => (
                <SummaryRow
                  key={item.id}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </DashedSection>

            <div className='pb-4 md:pb-5 space-y-4 md:space-y-5'>
              <SummaryRow label='Total' value={formatMoney(totalPayment)} />
              <Button onClick={handleNavigateToOrders} className='w-full h-12'>
                See My Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
