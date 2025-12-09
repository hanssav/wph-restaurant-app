import { Input } from '@/components/ui/input';
import { HERO_CONTENT, IMAGES } from '@/constants';
import { Search } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
  const { title, description, inputPlaceholder } = HERO_CONTENT;

  return (
    <>
      <div className='absolute top-0 -z-10 w-screen h-[827px]'>
        <Image
          src={IMAGES.HERO_COVER}
          alt='hero-cover'
          fill
          loading='eager'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-60%,rgba(0,0,0,0.8)_110%)]' />
      </div>

      <div className='w-full h-[827px] absolute top-0 flex-col-center text-white gap-6 md:gap-10'>
        <div className='space-y-1 md:space-y-2 flex-col-center'>
          <h1 className='text-display-lg-extrabold md:text-display-2xl-extrabold'>
            {title}
          </h1>
          <p className='text-lg-bold md:text-display-xs-bold'>{description}</p>
        </div>

        <div className='max-w-[604px] relative w-full px-4'>
          <Search className='absolute left-10 top-1/2 -translate-y-1/2 stroke-neutral-400 pointer-events-none' />
          <Input
            placeholder={inputPlaceholder}
            className='bg-white rounded-full placeholder:text-neutral-600 text-md-regular pl-14 pr-6 text-neutral-950'
          />
        </div>
      </div>
    </>
  );
};
