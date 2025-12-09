import {
  Avatar as AvatarShacdn,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
} & React.ComponentProps<typeof AvatarPrimitive.Root>;

export function Avatar({ src, alt, className, ...props }: AvatarProps) {
  return (
    <AvatarShacdn className={cn('size-10 md:size-12', className)} {...props}>
      <AvatarImage src={src} alt={alt} className='object-cover' />

      <AvatarFallback className='bg-neutral-700 text-muted-foreground font-medium text-left'>
        {alt?.toUpperCase()}
      </AvatarFallback>
    </AvatarShacdn>
  );
}
