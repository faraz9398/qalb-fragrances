"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Package, ShoppingBag, CreditCard, IndianRupee } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

export default function OrderConfirmationPage() {
  const { orderId, shipping, orderItems, paymentMethod } = useCheckout();

  if (!orderId) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <Package size={48} className="mx-auto text-qalb-black/20 mb-4" />
          <h2 className="font-heading text-xl text-qalb-black/60">No recent order</h2>
          <Link href="/products" className="mt-4 inline-block text-sm text-qalb-gold hover:underline">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  const total = orderItems.reduce((sum, item) => {
    return sum + (item.product.salePrice || item.product.price) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-qalb-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Check size={32} className="text-green-500" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl text-qalb-black mb-2">
            Thank You, {shipping.firstName}!
          </h1>
          <p className="text-sm sm:text-base text-qalb-black/50">
            Your order has been placed successfully.
          </p>
        </div>

        {orderId && (
          <div className="bg-qalb-black rounded-lg p-4 mb-6 text-center">
            <p className="text-xs text-qalb-cream/40 uppercase tracking-wider">Order Reference</p>
            <p className="font-mono text-sm sm:text-base font-semibold text-qalb-cream mt-1">{orderId}</p>
          </div>
        )}

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-4">
          <h3 className="font-heading text-base sm:text-lg text-qalb-black mb-4">Order Items</h3>
          <div className="space-y-3">
            {orderItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 pb-3 border-b border-qalb-black/5 last:border-0">
                <div className="w-12 h-12 rounded-md bg-qalb-cream flex items-center justify-center text-qalb-black/20">
                  <Package size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-qalb-black/80 line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-qalb-black/40">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium text-qalb-black/70">
                  ₹{((item.product.salePrice || item.product.price) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-qalb-black/10">
            <span className="text-sm font-semibold text-qalb-black">Total</span>
            <span className="text-lg font-bold text-qalb-gold">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-4">
          <h3 className="font-heading text-base sm:text-lg text-qalb-black mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-qalb-gold" />
            Payment
          </h3>
          <span className="text-sm text-qalb-black/60 capitalize">
            {paymentMethod === "razorpay" ? "Online Payment (Razorpay)" : "Cash on Delivery"}
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
          <h3 className="font-heading text-base sm:text-lg text-qalb-black mb-4">Shipping Details</h3>
          <div className="text-sm text-qalb-black/60 space-y-1">
            <p>{shipping.firstName} {shipping.lastName}</p>
            <p>{shipping.address}</p>
            <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
            <p>{shipping.email}</p>
            <p>{shipping.phone}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase font-semibold rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-qalb-black/10 text-qalb-black/60 text-sm tracking-wider uppercase rounded-md hover:border-qalb-black/30 transition-all"
          >
            <Package size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
