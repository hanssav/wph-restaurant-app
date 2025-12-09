import { AuthSectionProps, IMAGES } from '@/constants';
import Image from 'next/image';

export const AuthHeader = ({ desc, title }: AuthSectionProps) => {
  return (
    <>
      <div className='relative overflow-hidden min-h-9 max-h-11 max-w-[130px]'>
        <Image alt='logo' src={IMAGES.LOGO} fill loading={'lazy'} />
      </div>
      <div>
        <h2 className='text-display-xs-bold md:text-display-sm-bold'>
          {title}
        </h2>
        <p>{desc}</p>
      </div>
    </>
  );
};
