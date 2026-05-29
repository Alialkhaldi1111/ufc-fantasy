import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeClasses = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
};

export function LoadingSpinner({
  fullScreen,
  size = 'md',
  label,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={clsx(
          'rounded-full border-[#1e2a3a] border-t-[#39FF14] animate-spin',
          sizeClasses[size]
        )}
        style={{ boxShadow: '0 0 10px rgba(57,255,20,0.3)' }}
      />
      {label && <p className="text-sm text-gray-400 animate-pulse">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1a]/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}
