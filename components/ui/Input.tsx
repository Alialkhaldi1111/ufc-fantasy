import { clsx } from 'clsx';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefixIcon, suffixIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {prefixIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full rounded-md border bg-[#0f1520] px-3 py-2.5 text-sm text-white placeholder:text-gray-500 transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14]',
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-[#1e2a3a] hover:border-[#2a3a50]',
              prefixIcon && 'pl-9',
              suffixIcon && 'pr-9',
              className
            )}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {suffixIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
