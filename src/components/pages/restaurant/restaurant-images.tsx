import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { RestaurantDetail } from '@/types';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { cn } from '@/lib/utils';

export const RestaurantImages = ({
  images,
}: {
  images: RestaurantDetail['images'];
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return [
    <div key='mobile-images' className='md:hidden w-full'>
      <div className='rounded-2xl overflow-hidden'>
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className='w-full'
          opts={{ loop: true, align: 'start' }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images.map((image, idx) => (
              <CarouselItem key={idx} className='relative w-full'>
                <div className='relative w-full aspect-361/260 overflow-hidden rounded-xl'>
                  <Image
                    fill
                    src={image}
                    alt={`carousel-${idx}`}
                    className='object-cover'
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className='flex-center gap-2 mt-4'>
        {images.map((slide, idx) => (
          <button
            key={slide}
            onClick={() => api?.scrollTo(idx)}
            className={cn(
              'size-2.5 rounded-full transition-all',
              current === idx ? 'bg-primary-100' : 'bg-neutral-300'
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>,

    <div
      key='desktop-images'
      className='hidden md:flex md:flex-col md:gap-5 lg:flex-row lg:gap-5'
    >
      {/* Main Image */}
      <div className='relative w-full lg:w-[54.25%] h-[470px] rounded-2xl overflow-hidden'>
        {images?.[0] && (
          <Image
            fill
            src={images[0]}
            alt='Restaurant main view'
            className='object-cover'
            priority
            sizes='(min-width: 1024px) 54vw, 100vw'
          />
        )}
      </div>

      {/* Right Grid */}
      <div className='w-full lg:w-[44.08%] flex flex-col gap-5'>
        {/* Top Image */}
        <div className='relative h-[302px] rounded-2xl overflow-hidden'>
          {images?.[1] && (
            <Image
              fill
              src={images[1]}
              alt='Restaurant interior view'
              className='object-cover'
              priority
              sizes='(min-width: 1024px) 44vw, 100vw'
            />
          )}
        </div>

        {/* Bottom Row */}
        <div className='flex gap-5 h-[148px]'>
          <div className='relative flex-1 rounded-2xl overflow-hidden'>
            {images?.[2] && (
              <Image
                fill
                src={images[2]}
                alt='Restaurant detail view'
                className='object-cover'
                loading='lazy'
                sizes='(min-width: 1024px) 22vw, 50vw'
              />
            )}
          </div>

          <div className='relative flex-1 rounded-2xl overflow-hidden'>
            {images?.[3] && (
              <Image
                fill
                src={images[3]}
                alt='Restaurant ambiance view'
                className='object-cover'
                loading='lazy'
                sizes='(min-width: 1024px) 22vw, 50vw'
              />
            )}
          </div>
        </div>
      </div>
    </div>,
  ];
};
