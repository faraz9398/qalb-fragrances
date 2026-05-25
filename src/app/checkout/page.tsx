"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check, CreditCard, Truck, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { ShippingInfo } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCart();
  const { step, setStep, shipping, setShipping, setOrderId } = useCheckout();
  const [processing, setProcessing] = useState(false);

  const subtotal = getSubtotal();
  const shippingCost = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shippingCost;

  const updateShipping = (field: keyof ShippingInfo, value: string) => {
    setShipping({ ...shipping, [field]: value });
  };

  const isShippingValid = () => {
    return (
      shipping.firstName &&
      shipping.lastName &&
      shipping.email &&
      shipping.phone &&
      shipping.address &&
      shipping.city &&
      shipping.state &&
      shipping.zip
    );
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            product: { name: i.product.name },
            quantity: i.quantity,
            price: i.product.salePrice || i.product.price,
          })),
          shipping,
          subtotal,
          shippingCost,
          total,
        }),
      });
      const data = await res.json();
      setOrderId(data.orderId || `QALB-${Date.now().toString(36).toUpperCase()}`);
      clearCart();
      setStep(3);
      router.push("/order-confirmation");
    } catch {
      setOrderId(`QALB-${Date.now().toString(36).toUpperCase()}`);
      clearCart();
      setStep(3);
      router.push("/order-confirmation");
    }
  };

  if (items.length === 0 && step < 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-full bg-qalb-black/5 flex items-center justify-center mb-4">
          <Package size={28} className="text-qalb-black/30" />
        </div>
        <h2 className="font-heading text-xl sm:text-2xl text-qalb-black/60">Nothing to checkout</h2>
        <p className="text-qalb-black/40 text-sm mt-1">Add items to your cart first.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const steps = [
    { num: 1, label: "Shipping", icon: Truck },
    { num: 2, label: "Payment", icon: CreditCard },
    { num: 3, label: "Confirmation", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-qalb-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <h1 className="font-heading text-2xl sm:text-3xl text-qalb-black mb-6 sm:mb-8">Checkout</h1>

        <div className="flex items-center justify-center mb-8 sm:mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step > s.num
                      ? "bg-green-500 text-white"
                      : step === s.num
                      ? "bg-qalb-gold text-qalb-black"
                      : "bg-qalb-black/10 text-qalb-black/30"
                  }`}
                >
                  {step > s.num ? <Check size={16} /> : <s.icon size={16} />}
                </div>
                <span
                  className={`text-[10px] sm:text-xs mt-1.5 hidden sm:block ${
                    step >= s.num ? "text-qalb-black/70" : "text-qalb-black/30"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-px mx-1 sm:mx-2 ${
                    step > s.num ? "bg-green-500" : "bg-qalb-black/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            {step === 1 && (
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                <h2 className="font-heading text-lg sm:text-xl text-qalb-black mb-4 sm:mb-5">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={shipping.firstName}
                    onChange={(e) => updateShipping("firstName", e.target.value)}
                    className="px-3.5 py-2.5 sm:py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={shipping.lastName}
                    onChange={(e) => updateShipping("lastName", e.target.value)}
                    className="px-3.5 py-2.5 sm:py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={shipping.email}
                    onChange={(e) => updateShipping("email", e.target.value)}
                    className="px-3.5 py-2.5 sm:py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={shipping.phone}
                    onChange={(e) => updateShipping("phone", e.target.value)}
                    className="px-3.5 py-2.5 sm:py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Address *"
                    value={shipping.address}
                    onChange={(e) => updateShipping("address", e.target.value)}
                    className="col-span-full px-3.5 py-2.5 sm:py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    value={shipping.city}
                    onChange={(e) => updateShipping("city", e.target.value)}
                    className="px-3.5 py-2.5 sm:py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="State *"
                    value={shipping.state}
                    onChange={(e) => updateShipping("state", e.target.value)}
                    className="px-3.5 py-2.5 sm:py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code *"
                    value={shipping.zip}
                    onChange={(e) => updateShipping("zip", e.target.value)}
                    className="px-3.5 py-2.5 sm:py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!isShippingValid()}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase font-semibold rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                <h2 className="font-heading text-lg sm:text-xl text-qalb-black mb-4 sm:mb-5">Payment</h2>

                <div className="border border-qalb-black/10 rounded-md p-4 mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="accent-qalb-gold"
                    />
                    <div>
                      <span className="text-sm font-medium text-qalb-black/80">Cash on Delivery</span>
                      <p className="text-xs text-qalb-black/40">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>

                <div className="border border-qalb-black/10 rounded-md p-4 mb-4 opacity-50">
                  <label className="flex items-center gap-3 cursor-not-allowed">
                    <input
                      type="radio"
                      name="payment"
                      disabled
                      className="accent-qalb-gold"
                    />
                    <div>
                      <span className="text-sm font-medium text-qalb-black/60">Online Payment</span>
                      <p className="text-xs text-qalb-black/30">Coming soon</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-qalb-black/10 text-qalb-black/60 text-sm tracking-wider uppercase rounded-md hover:border-qalb-black/30 transition-all"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    className="flex-[2] flex items-center justify-center gap-2 py-3.5 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase font-semibold rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300 disabled:opacity-60"
                  >
                    {processing ? "Processing..." : `Place Order • ₹${total.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm sticky top-24">
              <h3 className="font-heading text-base sm:text-lg text-qalb-black mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-qalb-cream flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-qalb-black/80 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-qalb-black/40">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-qalb-black/70 whitespace-nowrap">
                      ₹{((item.product.salePrice || item.product.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-qalb-black/10 space-y-2">
                <div className="flex justify-between text-sm text-qalb-black/60">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-qalb-black/60">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-base sm:text-lg text-qalb-black pt-2 border-t border-qalb-black/10">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
