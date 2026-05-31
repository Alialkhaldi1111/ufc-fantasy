'use client';
import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productTagline: string;
  price: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline';
  label?: string;
}

export function AddToCartButton({
  productId,
  productName,
  productTagline,
  price,
  className = '',
  size = 'lg',
  variant = 'primary',
  label,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem({ id: productId, name: productName, tagline: productTagline, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base',
  };

  const variantClasses = {
    primary: added
      ? 'bg-green-500 text-white'
      : 'bg-[#E8443A] text-white hover:bg-[#D63A30]',
    outline: added
      ? 'border-2 border-green-500 text-green-600'
      : 'border-2 border-[#E8443A] text-[#E8443A] hover:bg-[#E8443A] hover:text-white',
  };

  return (
    <button
      onClick={handleAdd}
      className={`
        w-full rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          {label ?? `Add to Cart — $${price}`}
        </>
      )}
    </button>
  );
}
