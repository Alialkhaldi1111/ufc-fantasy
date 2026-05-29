import { clsx } from 'clsx';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  neonBorder?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, neonBorder, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'rounded-xl border bg-[#0f1520] text-gray-100',
        hover &&
          'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer',
        neonBorder
          ? 'border-[#39FF14]/50 shadow-[0_0_20px_rgba(57,255,20,0.15)] hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:border-[#39FF14]'
          : 'border-[#1e2a3a]',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex flex-col space-y-1.5 p-5', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={clsx('text-lg font-bold leading-tight text-white', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('p-5 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex items-center p-5 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
