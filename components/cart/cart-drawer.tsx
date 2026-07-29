'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  Tag,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { COURSES, Course } from '@/lib/lms-data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItemIds: string[];
  onRemoveFromCart: (courseId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItemIds,
  onRemoveFromCart,
  onClearCart,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const cartCourses = COURSES.filter((c) => cartItemIds.includes(c.id));
  const subtotal = cartCourses.reduce((acc, c) => acc + c.price, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'EDUFLOW' || couponCode.toUpperCase() === 'EDU2026') {
      setDiscountAmount(25);
      setCouponApplied(true);
    } else {
      alert('Invalid code! Try "EDU2026" for $25 off.');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between text-slate-900 dark:text-white">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">Your Cart ({cartCourses.length})</h2>
              {cartCourses.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-red-500 hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {checkoutComplete ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold">Enrollment Complete!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Congratulations! You now have full lifetime access to your newly enrolled courses.
                </p>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    onClearCart();
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl gradient-bg text-white font-bold text-xs"
                >
                  Start Learning Now
                </button>
              </div>
            ) : cartCourses.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-3">
                <p className="text-sm font-semibold">Your cart is currently empty</p>
                <p className="text-xs text-slate-500">Explore 5,000+ courses and enroll today!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-16 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white truncate">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-slate-400">{c.instructor.name}</div>
                      <div className="font-extrabold text-slate-900 dark:text-white pt-1">
                        ${c.price}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(c.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Coupon Box */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code (e.g. EDU2026)"
                      className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white font-bold rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <div className="text-emerald-500 font-bold flex items-center gap-1 text-[11px]">
                      <Tag className="w-3.5 h-3.5" /> Coupon &quot;EDU2026&quot; applied! $25 OFF
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {!checkoutComplete && cartCourses.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-4 text-xs">
              <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-bold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>Processing Secure Checkout...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" /> Checkout & Enroll Now
                  </>
                )}
              </button>

              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-slate-500" /> 256-Bit SSL Encrypted Guarantee
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
