import { IMAGES } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const HomePage = () => {
  return (
    <>
      <div className={cn('absolute top-0 -z-10 w-screen h-full max-h-[827px]')}>
        <Image
          src={IMAGES.HERO_COVER}
          alt='hero-cover'
          fill
          loading='eager'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-60%,rgba(0,0,0,0.8)_110%)] pointer-events-none' />
      </div>
      <div className='container-x'>
        <div className=''></div>
      </div>
    </>
  );
};

export default HomePage;
