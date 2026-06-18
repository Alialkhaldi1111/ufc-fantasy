'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total } = useCartStore();

  const totalCents = total();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0f1520] border-l border-white/10 z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-white font-bold text-lg">Your Cart ({items.length})</h2>
          <button onClick={closeCart} className="text-white/60 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🧊</div>
              <p className="text-white/50 text-sm">Your cart is empty</p>
              <Link
                href="/store"
                onClick={closeCart}
                className="mt-4 inline-block text-[#39FF14] text-sm font-semibold hover:underline"
              >
                Start shopping →
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-900 to-[#39FF14]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🧊</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-[#39FF14] font-bold">${(item.price / 100).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-auto text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Subtotal</span>
              <span className="text-white font-bold text-lg">${(totalCents / 100).toFixed(2)}</span>
            </div>
            <p className="text-white/50 text-xs text-center">Free shipping on all orders</p>
            <Link
              href="/store/cart"
              onClick={closeCart}
              className="block w-full bg-[#39FF14] text-black font-black text-center py-4 rounded-xl text-lg hover:bg-[#2acc10] transition-colors"
            >
              CHECKOUT — ${(totalCents / 100).toFixed(2)}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
