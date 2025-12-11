import {
  Avatar as AvatarShacdn,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn, stringToColor } from '@/lib/utils';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

type AvatarProps = {
  src?: string;
  alt?: string;
  className?: string;
} & React.ComponentProps<typeof AvatarPrimitive.Root>;

export function Avatar({ src, alt, className, ...props }: AvatarProps) {
  const initials = alt
    ? alt
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <AvatarShacdn className={cn('size-10 md:size-12', className)} {...props}>
      <AvatarImage src={src} alt={alt} className='object-cover' />

      <AvatarFallback
        className='text-sm font-medium md:text-base text-white'
        style={{
          backgroundColor: alt ? stringToColor(alt) : '#ccc',
        }}
      >
        {initials}
      </AvatarFallback>
    </AvatarShacdn>
  );
}
