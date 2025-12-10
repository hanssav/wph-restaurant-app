import { Button } from '@/components/ui/button';
import {
  FOOTER_CONSTANTS,
  FOOTER_MENUS,
  IMAGES,
  SOCIAL_ICONS,
} from '@/constants';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import { ComponentProps } from 'react';

export const FooterWrapper = ({
  className,
  ...props
}: ComponentProps<'footer'>) => (
  <div className='w-screen bg-neutral-950'>
    <footer
      className={cn(
        'container-x py-10 md:py-20 flex-col-start gap-6 md:flex-between'
      )}
      {...props}
    />
  </div>
);

export const FooterInfo = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex-col-start gap-4 md:gap-10', className)} {...props} />
);

export const FooterLogo = ({
  parentClassName,
  ...props
}: { parentClassName?: string } & ImageProps) => (
  <div className={cn('relative overflow-hidden w-[149px] h-[42px]')}>
    <Image fill sizes='(max-width: 768px) 149px, 149px' {...props} />
  </div>
);

const SocialWrapper = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('space-x-3', className)} {...props} />
);

export const Footer = () => {
  const { desc, social_title } = FOOTER_CONSTANTS;

  return (
    <FooterWrapper>
      <FooterInfo>
        <div className='space-y-[22px] w-full md:max-w-[380px]'>
          <FooterLogo
            src={IMAGES.FOOTER_LOGO}
            alt='footer-logo'
            loading='lazy'
            className='object-contain'
          />
          <p className='desc text-neutral-25'>{desc}</p>
        </div>
        <div className='space-y-5'>
          <h2 className='desc font-extrabold text-neutral-25'>
            {social_title}
          </h2>

          <SocialWrapper>
            {SOCIAL_ICONS.map((icon) => {
              const Icon = icon.icon;
              return (
                <Button
                  variant='outline'
                  size='icon'
                  key={icon.id}
                  className='size-10 border-neutral-800'
                >
                  <Icon className='object-contain stroke-neutral-25' />
                </Button>
              );
            })}
          </SocialWrapper>
        </div>
      </FooterInfo>

      <div className='md:contents flex justify-between w-full'>
        {FOOTER_MENUS.map((menu) => (
          <div
            className='w-full md:w-fit space-y-4 md:space-y-5'
            key={menu.title}
          >
            <h4 className='desc font-extrabold text-neutral-25'>
              {menu.title}
            </h4>
            {menu.items.map((item) => (
              <p key={item} className='desc text-neutral-25 font-normal'>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </FooterWrapper>
  );
};
