'use client';

import { useState } from 'react';
import { Minus, Plus, X, Tag, Truck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import TrustBadges from '@/components/store/TrustBadges';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<{ code: string; value: number } | null>(null);
  const [codeError, setCodeError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const subtotal = total();
  const discount = appliedCode ? Math.floor(subtotal * (appliedCode.value / 100)) : 0;
  const shipping = subtotal - discount >= 19900 ? 0 : 999;
  const orderTotal = subtotal - discount + shipping;

  const applyCode = async () => {
    setCodeError('');
    const res = await fetch('/api/store/discount-codes/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: discountCode.trim().toUpperCase() }),
    });
    const data = await res.json();
    if (data.valid) {
      setAppliedCode({ code: discountCode.trim().toUpperCase(), value: data.value });
    } else {
      setCodeError('Invalid or expired discount code.');
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity, price: i.price, name: i.name })),
          discountCode: appliedCode?.code,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-6xl">🛒</div>
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="text-gray-400">Add the APEX Cold Plunge to get started.</p>
        <Link
          href="/store"
          className="inline-block bg-[#39FF14] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#2acc10] transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/store" className="text-gray-400 hover:text-white flex items-center gap-1 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <span className="text-gray-600">/</span>
        <h1 className="text-2xl font-black text-white">Your Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-950 to-blue-950 flex items-center justify-center text-3xl shrink-0">
                🧊
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <div className="font-semibold text-white">{item.name}</div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[#39FF14] font-bold text-lg">${(item.price / 100).toFixed(2)}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <span className="ml-auto text-gray-300 font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Discount Code */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Tag className="w-4 h-4 text-[#39FF14]" />
              Discount Code
            </div>
            {appliedCode ? (
              <div className="flex items-center justify-between bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-xl p-3">
                <span className="text-[#39FF14] font-mono font-bold">{appliedCode.code} — {appliedCode.value}% off</span>
                <button onClick={() => setAppliedCode(null)} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  placeholder="APEX20"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder:text-gray-500 font-mono text-sm focus:outline-none focus:border-[#39FF14]"
                />
                <button
                  onClick={applyCode}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            {codeError && <p className="text-red-400 text-xs">{codeError}</p>}
          </div>

          {/* Shipping Banner */}
          {shipping > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 border border-white/10 rounded-xl p-3">
              <Truck className="w-4 h-4 text-[#39FF14]" />
              Add ${((19900 - (subtotal - discount)) / 100).toFixed(2)} more for <span className="text-[#39FF14] font-semibold ml-1">FREE shipping</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 sticky top-20">
            <h2 className="font-bold text-white text-lg">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#39FF14]">
                  <span>Discount ({appliedCode?.code})</span>
                  <span>−${(discount / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-[#39FF14]">FREE</span> : `$${(shipping / 100).toFixed(2)}`}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white text-lg">
                <span>Total</span>
                <span>${(orderTotal / 100).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#39FF14] hover:bg-[#2acc10] disabled:opacity-50 text-black font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-95"
            >
              {isCheckingOut ? 'Redirecting...' : 'Checkout Securely →'}
            </button>
            <p className="text-xs text-gray-500 text-center">🔒 Secured by Stripe. Your payment info is never stored.</p>
            <TrustBadges />
          </div>
        </div>
      </div>
    </div>
  );
}
