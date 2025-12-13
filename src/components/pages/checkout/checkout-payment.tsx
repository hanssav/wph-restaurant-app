'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BankName, BANKS } from '@/constants';
import { cn, formatMoney } from '@/lib/utils';
import { CartSummary } from '@/types';
import { Button } from '@/components/ui/button';

const Wrapper = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('space-y-3 md:space-y-4', className)} {...props} />
);

export const CheckoutPaymentMethod = ({
  summary,
  handleBuy,
  setSelectedBank,
  selectedBank,
  isCheckoutLoading,
}: {
  summary: CartSummary;
  handleBuy?: () => void;
  selectedBank: BankName;
  setSelectedBank: React.Dispatch<React.SetStateAction<BankName>>;
  isCheckoutLoading: boolean;
}) => {
  const deliveryFee = 10000;
  const serviceFee = 1000;
  const total = summary.totalPrice + deliveryFee + serviceFee;
  const mappedSummary = [
    {
      id: 'items',
      label: `Price (${summary.totalItems} items)`,
      value: summary.totalPrice,
    },
    { id: 'delivery', label: 'Delivery Fee', value: deliveryFee },
    { id: 'service', label: 'Service Fee', value: serviceFee },
    { id: 'total', label: 'Total', value: total },
  ];

  const handleBankChange = (value: string) => {
    if (BANKS.some((b) => b.name === value)) {
      setSelectedBank(value as BankName);
    }
  };

  return (
    <Card className='w-full py-4 md:py-5 rounded-2xl overflow-visible relative'>
      <CardContent className='px-4 md:px-5 space-y-6'>
        <Wrapper>
          <h4 className='title'>Payment Method</h4>
          <div className='relative'>
            <RadioGroup
              value={selectedBank}
              onValueChange={handleBankChange}
              className={cn(
                'space-y-3',
                '*:border-b *:border-neutral-300 *:last:border-none *:pb-4',
                'border-dashed border-b relative'
              )}
            >
              {BANKS.map((bank) => {
                const itemId = `bank-${bank.id}`;
                return (
                  <div key={bank.id} className='flex-between items-center'>
                    <div className='flex items-center gap-3'>
                      <div className='relative size-10 rounded-md border border-neutral-300 flex-center'>
                        <Image
                          src={bank.icon}
                          alt={bank.name}
                          width={30}
                          height={11}
                          loading='lazy'
                          className='object-contain'
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                      <Label htmlFor={itemId} className='desc'>
                        {bank.name}
                      </Label>
                    </div>
                    <RadioGroupItem value={String(bank.name)} id={itemId} />
                  </div>
                );
              })}
            </RadioGroup>

            <div className='absolute -left-9 bottom-0 translate-y-1/2 w-8 h-8 bg-neutral-50 rounded-full z-10' />

            <div className='absolute -right-9 bottom-0 translate-y-1/2 w-8 h-8 bg-neutral-50 rounded-full z-10' />
          </div>
        </Wrapper>

        <Wrapper>
          <h4 className='title'>Payment Summary</h4>
          {mappedSummary.map((sm) => (
            <div key={sm.id} className='flex-between'>
              <p className='desc'>{sm.label}</p>
              <h4 className='title'>{formatMoney(sm.value)}</h4>
            </div>
          ))}
          <Button onClick={handleBuy} className='w-full'>
            {isCheckoutLoading ? 'Processing...' : 'Buy'}
          </Button>
        </Wrapper>
      </CardContent>
    </Card>
  );
};
