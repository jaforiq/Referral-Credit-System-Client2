'use client';

import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const { user, isAuthenticated, updateCredits } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();

  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(bookId, newQuantity);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      router.push('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    try {
      const purchaseData = {
        productName: `${items.length} Book(s)`,
        amount: totalPrice,
      };

      const response = await api.createPurchase(purchaseData);

      if (response.data) {
        updateCredits(response.data.currentCredits);
        toast.success(
          `Purchase successful! You earned 2 credits from your referral!`,
          { duration: 5000, icon: '🎊' }
        );
      } else {
        toast.success('Purchase completed successfully!');
      }

      clearCart();
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Checkout failed. Please try again.';
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding some amazing books to your cart!
            </p>
            <Link href="/">
              <button className="btn-primary flex items-center gap-2 mx-auto">
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">{items.length} item(s) in your cart</p>
          </div>
          <Link href="/">
            <button className="btn-secondary flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.book._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card flex gap-4"
              >
                <div className="relative w-24 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.book.coverImage}
                    alt={item.book.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">by {item.book.author}</p>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                    {item.book.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">
                      ${item.book.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => handleQuantityChange(item.book._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.book._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.book._id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.book._id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.book.title} x {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {user && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-primary-900">
                    <strong>💰 Your Credits:</strong> {user.credits} credits
                  </p>
                  {!user.hasPurchased && (
                    <p className="text-xs text-primary-700 mt-2">
                      ✨ This is your first purchase! You'll earn 2 credits if you were referred.
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="btn-primary w-full text-lg"
              >
                {isProcessing ? 'Processing...' : `Checkout - $${totalPrice.toFixed(2)}`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by BookHub
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}