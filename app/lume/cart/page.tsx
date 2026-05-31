'use client';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Shield, Truck, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 75 ? 0 : 7.99;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#FAF6F1] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/lume" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#4A3728]" />
          </Link>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Your Cart</h1>
          {items.length > 0 && (
            <span className="bg-[#E8443A] text-white text-sm font-bold px-2.5 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 text-[#C9A96E] mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Your cart is empty</h2>
            <p className="text-[#6B5B4E] mb-8">Time to glow. Add a product to get started.</p>
            <Link
              href="/lume/products/glow-wand"
              className="bg-[#E8443A] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#D63A30] transition-colors inline-block"
            >
              Shop the Glow Wand
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free shipping bar */}
              {subtotal < 75 && (
                <div className="bg-white rounded-2xl p-4 border border-[#E8D5C8]">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-[#E8443A]" />
                    <span className="text-sm text-[#4A3728]">
                      Add <strong className="text-[#E8443A]">${(75 - subtotal).toFixed(2)}</strong> more for free shipping
                    </span>
                  </div>
                  <div className="h-2 bg-[#E8D5C8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#E8443A] rounded-full transition-all duration-500"
                      style={{ width: `${(subtotal / 75) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {subtotal >= 75 && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">You qualify for FREE shipping!</span>
                </div>
              )}

              {/* Cart items */}
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 border border-[#E8D5C8] flex gap-5">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-red-100 to-rose-50 flex-shrink-0 flex items-center justify-center">
                    <span className="text-3xl">✨</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1A1A1A]">{item.name}</p>
                    <p className="text-[#9B8B7E] text-sm mt-0.5">{item.tagline}</p>
                    <p className="text-[#E8443A] font-bold text-lg mt-1">${item.price}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E8D5C8] rounded-full overflow-hidden bg-[#FAF6F1]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-[#F0E8E0] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-[#1A1A1A]" />
                        </button>
                        <span className="px-4 text-sm font-semibold text-[#1A1A1A] min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-[#F0E8E0] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#1A1A1A]" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1.5 text-sm text-[#9B8B7E] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell */}
              <div className="bg-gradient-to-br from-[#FDF0EE] to-[#FAF6F1] rounded-2xl p-5 border border-[#E8443A]/20">
                <p className="text-sm font-semibold text-[#E8443A] mb-1">🌟 Most customers also grab:</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Lumé Glow Serum</p>
                    <p className="text-[#6B5B4E] text-sm">Formulated for red light therapy absorption</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#E8443A] font-bold">+$29</p>
                    <p className="text-[#9B8B7E] text-xs line-through">$47</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    useCartStore.getState().addItem({
                      id: 'glow-serum',
                      name: 'Lumé Glow Serum',
                      tagline: 'Hyaluronic Acid + Vitamin C (50ml)',
                      price: 29,
                    });
                  }}
                  className="mt-3 w-full border border-[#E8443A] text-[#E8443A] py-2.5 rounded-full text-sm font-semibold hover:bg-[#E8443A] hover:text-white transition-colors"
                >
                  Add Glow Serum — $29
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-white rounded-2xl border border-[#E8D5C8] p-6 sticky top-24">
                <h2 className="font-bold text-[#1A1A1A] text-xl mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B5B4E]">Subtotal</span>
                    <span className="font-medium text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B5B4E]">Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1A1A1A]'}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B5B4E]">Tax</span>
                    <span className="text-[#9B8B7E]">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-[#E8D5C8] pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#1A1A1A]">Total</span>
                    <span className="font-bold text-[#1A1A1A] text-2xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-[#E8443A] text-white py-4 rounded-full font-semibold text-base hover:bg-[#D63A30] transition-colors mb-3 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Secure Checkout
                </button>

                <div className="flex items-center justify-center gap-6 text-xs text-[#9B8B7E]">
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" />SSL Secured</span>
                  <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" />Safe Payment</span>
                </div>

                <div className="mt-5 p-3 bg-[#F9F4EF] rounded-xl">
                  <p className="text-xs text-[#6B5B4E] text-center">
                    🛡️ <strong>30-Day Money-Back Guarantee.</strong> Not happy? We'll refund every penny.
                  </p>
                </div>

                {/* Payment icons */}
                <div className="mt-4 flex items-center justify-center gap-3 text-[#9B8B7E]">
                  {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((p) => (
                    <span key={p} className="text-xs font-mono bg-[#F0E8E0] px-2 py-1 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
