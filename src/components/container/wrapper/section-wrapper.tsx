import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export const SectionTitle = ({ className, ...props }: ComponentProps<'h1'>) => (
  <h1
    className={cn(
      'text-display-xs-extrabold md:text-display-md-extrabold',
      className
    )}
    {...props}
  />
);

export const SectionHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('flex-start gap-4 md:gap-5', className)} {...props} />
);

export const SectionContent = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('py-2 space-y-4 md:space-y-5', className)} {...props} />
);

export const SectionWrapper = ({
  title,
  className,
  children,
  ...props
}: { title?: string } & ComponentProps<'section'>) => {
  return (
    <section
      className={cn('flex flex-col gap-4 md:gap-8', className)}
      {...props}
    >
      {/* Need adjust */}
      {title && [
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>,

        <SectionContent>{children}</SectionContent>,
      ]}

      {children}
    </section>
  );
};
