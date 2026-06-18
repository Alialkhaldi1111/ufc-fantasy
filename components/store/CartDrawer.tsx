'use client';

import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore();

  if (!isOpen) return null;

  const subtotal = total();
  const shipping = subtotal >= 19900 ? 0 : 999;
  const orderTotal = subtotal + shipping;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f1520] z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="font-bold text-white text-lg flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#39FF14]" />
            Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button onClick={closeCart} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
            <ShoppingCart className="w-12 h-12 opacity-30" />
            <p>Your cart is empty</p>
            <button onClick={closeCart} className="text-[#39FF14] text-sm hover:underline">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-3">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center text-2xl shrink-0">
                    🧊
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm truncate">{item.name}</div>
                    <div className="text-[#39FF14] font-bold">${(item.price / 100).toFixed(2)}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-400 shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-[#39FF14]">FREE</span> : `$${(shipping / 100).toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-500">Add ${((19900 - subtotal) / 100).toFixed(2)} more for free shipping</p>
              )}
              <div className="flex justify-between font-bold text-white text-lg border-t border-white/10 pt-3">
                <span>Total</span>
                <span>${(orderTotal / 100).toFixed(2)}</span>
              </div>
              <Link
                href="/store/cart"
                onClick={closeCart}
                className="block w-full bg-[#39FF14] hover:bg-[#2acc10] text-black font-bold py-3 rounded-xl text-center transition-colors"
              >
                Checkout →
              </Link>
              <button onClick={closeCart} className="block w-full text-gray-400 text-sm text-center hover:text-white transition-colors">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
