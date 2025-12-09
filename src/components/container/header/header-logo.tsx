import { IMAGES } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  onClick: () => void;
  isHome?: boolean;
};
export const HeaderLogo = ({ onClick, isHome = false }: Props) => {
  return (
    <div
      className='relative overflow-hidden size-10 md:size-11 md:w-full md:max-w-40'
      onClick={onClick}
    >
      <Image
        src={IMAGES.LOGO}
        alt='Logo'
        fill
        className={cn(
          'object-cover object-left',
          isHome && 'invert brightness-0 saturate-0 contrast-200'
        )}
        sizes='(max-width: 768px) 40px, 160px'
      />
    </div>
  );
};
