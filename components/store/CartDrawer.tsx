'use client';
import { useCartStore } from '@/store/useCartStore';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total, count } = useCartStore();
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const freeShippingThreshold = 75;
  const remaining = freeShippingThreshold - cartTotal;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF6F1] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8D5C8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E8443A]" />
            <span className="font-semibold text-[#1A1A1A] text-lg">
              Your Cart {cartCount > 0 && `(${cartCount})`}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-[#F0E8E0] transition-colors"
          >
            <X className="w-5 h-5 text-[#1A1A1A]" />
          </button>
        </div>

        {/* Free shipping progress */}
        {cartTotal > 0 && remaining > 0 && (
          <div className="px-6 py-3 bg-[#FDF0EE] border-b border-[#E8D5C8]">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-[#E8443A]" />
              <span className="text-sm text-[#1A1A1A]">
                Add <span className="font-semibold text-[#E8443A]">${remaining.toFixed(0)}</span> more for FREE shipping
              </span>
            </div>
            <div className="h-1.5 bg-[#E8D5C8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E8443A] rounded-full transition-all duration-500"
                style={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        {cartTotal >= freeShippingThreshold && (
          <div className="px-6 py-3 bg-green-50 border-b border-green-100">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">You qualify for FREE shipping!</span>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-[#C9A96E] mb-4 opacity-50" />
              <p className="text-[#6B5B4E] text-lg mb-2">Your cart is empty</p>
              <p className="text-[#9B8B7E] text-sm mb-6">Add a product to get started</p>
              <button
                onClick={closeCart}
                className="bg-[#E8443A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#D63A30] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">
                  {/* Product image placeholder */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-red-100 to-rose-50 flex-shrink-0 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1A1A1A] text-sm leading-tight">{item.name}</p>
                    <p className="text-[#9B8B7E] text-xs mt-0.5">{item.tagline}</p>
                    <p className="text-[#E8443A] font-semibold mt-1">${item.price}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E8D5C8] rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-[#F0E8E0] transition-colors"
                        >
                          <Minus className="w-3 h-3 text-[#1A1A1A]" />
                        </button>
                        <span className="px-3 text-sm font-medium text-[#1A1A1A] min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-[#F0E8E0] transition-colors"
                        >
                          <Plus className="w-3 h-3 text-[#1A1A1A]" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-[#9B8B7E] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8D5C8] px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#6B5B4E]">Subtotal</span>
              <span className="font-semibold text-[#1A1A1A] text-lg">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-[#9B8B7E]">Taxes and shipping calculated at checkout</p>

            <Link href="/lume/cart" onClick={closeCart}>
              <button className="w-full bg-[#E8443A] text-white py-4 rounded-full font-semibold text-base hover:bg-[#D63A30] transition-colors flex items-center justify-center gap-2">
                Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-[#6B5B4E] text-sm hover:text-[#1A1A1A] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
