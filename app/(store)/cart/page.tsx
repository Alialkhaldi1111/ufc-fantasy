'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { TrustBadges } from '@/components/store/TrustBadges';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCartStore();
  const [discountCode, setDiscountCode] = useState('');
  const [discountResult, setDiscountResult] = useState<{
    valid: boolean;
    type?: string;
    value?: number;
    error?: string;
  } | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const subtotal = total();
  const discountAmount =
    discountResult?.valid && discountResult.value
      ? discountResult.type === 'percentage'
        ? Math.round(subtotal * (discountResult.value / 100))
        : discountResult.value
      : 0;
  const shipping = subtotal - discountAmount >= 19900 ? 0 : 999;
  const orderTotal = subtotal - discountAmount + shipping;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    try {
      const res = await fetch('/api/store/discount-codes/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode }),
      });
      const data = await res.json();
      setDiscountResult(data);
    } catch {
      setDiscountResult({ valid: false, error: 'Failed to validate code' });
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          discountCode: discountResult?.valid ? discountCode : undefined,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="text-7xl">🧊</div>
        <h1 className="text-3xl font-black text-white">Your cart is empty</h1>
        <p className="text-white/50">Start your recovery journey today.</p>
        <Link
          href="/store"
          className="inline-block bg-[#39FF14] text-black font-black px-8 py-4 rounded-xl hover:bg-[#2acc10] transition-colors"
        >
          SHOP NOW
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-white mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 bg-[#0f1520] border border-white/10 rounded-xl p-4"
            >
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-900 to-[#39FF14]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🧊</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-white font-bold">{item.name}</p>
                    <p className="text-white/50 text-sm">APEX Cold Plunge</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="text-white/60 hover:text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white font-bold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="text-white/60 hover:text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-white font-bold text-lg">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <Link href="/store" className="text-[#39FF14] text-sm hover:underline">
            ← Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="space-y-4">
          <div className="bg-[#0f1520] border border-white/10 rounded-xl p-5 space-y-4">
            <h2 className="text-white font-bold text-lg">Order Summary</h2>

            {/* Discount code */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  placeholder="Discount code"
                  className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#39FF14]/50"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="bg-white/10 text-white text-sm px-3 py-2 rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Apply
                </button>
              </div>
              {discountResult && (
                <p
                  className={`text-xs ${discountResult.valid ? 'text-[#39FF14]' : 'text-[#FF3131]'}`}
                >
                  {discountResult.valid
                    ? `✅ ${discountResult.value}${discountResult.type === 'percentage' ? '%' : '¢'} off applied!`
                    : `❌ ${discountResult.error}`}
                </p>
              )}
            </div>

            <div className="space-y-2 text-sm border-t border-white/10 pt-4">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#39FF14]">
                  <span>Discount ({discountCode})</span>
                  <span>−${(discountAmount / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-[#39FF14]">FREE</span> : `$${(shipping / 100).toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-white/40 text-xs">
                  Free shipping on orders over $199
                </p>
              )}
            </div>

            <div className="flex justify-between text-white font-black text-lg border-t border-white/10 pt-4">
              <span>Total</span>
              <span>${(orderTotal / 100).toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full bg-[#39FF14] text-black font-black text-lg py-4 rounded-xl hover:bg-[#2acc10] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {checkoutLoading ? 'Redirecting...' : 'CHECKOUT NOW →'}
            </button>

            <p className="text-white/40 text-xs text-center">
              Secure checkout powered by Stripe
            </p>
          </div>

          <TrustBadges />
        </div>
      </div>
    </div>
  );
}
