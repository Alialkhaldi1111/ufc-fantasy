'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a] disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-md',
  {
    variants: {
      variant: {
        default:
          'bg-[#39FF14] text-[#0a0f1a] hover:bg-[#2ecc10] active:scale-[0.98] shadow-[0_0_15px_rgba(57,255,20,0.4)] hover:shadow-[0_0_25px_rgba(57,255,20,0.6)]',
        outline:
          'border border-[#39FF14] text-[#39FF14] bg-transparent hover:bg-[#39FF14]/10 active:scale-[0.98]',
        ghost:
          'text-gray-300 hover:text-white hover:bg-white/10 active:scale-[0.98]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-[0_0_15px_rgba(220,38,38,0.3)]',
        secondary:
          'bg-[#1e2a3a] text-gray-200 hover:bg-[#243040] border border-[#2a3a50] active:scale-[0.98]',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
