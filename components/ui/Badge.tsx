import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/40',
        secondary:
          'bg-[#1e2a3a] text-gray-300 border border-[#2a3a50]',
        destructive:
          'bg-red-900/50 text-red-400 border border-red-700/50',
        outline:
          'border border-gray-600 text-gray-300 bg-transparent',
        warning:
          'bg-yellow-900/40 text-yellow-400 border border-yellow-600/40',
        live:
          'bg-red-600/20 text-red-400 border border-red-500/50 animate-pulse',
        premium:
          'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={clsx(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
