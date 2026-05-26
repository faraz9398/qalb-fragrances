"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { useToast } from "@/context/ToastContext";
import { env } from "@/lib/env";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (message: string) => void;
}

export default function RazorpayCheckout({ amount, onSuccess, onError }: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const { items, getSubtotal, clearCart } = useCart();
  const { shipping, setOrderId, setStep } = useCheckout();
  const { showToast } = useToast();

  const hasKeys = !!(env.RAZORPAY_KEY_ID);

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const shippingCost = getSubtotal() >= 499 ? 0 : 49;
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR" }),
      });
      const orderData = await res.json();
      if (!orderData.success) throw new Error(orderData.message);

      const options = {
        key: env.RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "The Qalb Fragrances",
        description: `Order of ${items.length} item(s)`,
        order_id: orderData.orderId,
        handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
          const verifyRes = await fetch("/api/verify-razorpay-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: items.map((i) => ({
                  product: { name: i.product.name },
                  quantity: i.quantity,
                  price: i.product.salePrice || i.product.price,
                })),
                shipping,
                subtotal: getSubtotal(),
                shippingCost,
                total: amount,
                paymentMethod: "razorpay",
                paymentId: response.razorpay_payment_id,
              }),
            });
            setOrderId(`QALB-${Date.now().toString(36).toUpperCase()}`);
            clearCart();
            setStep(3);
            onSuccess(response.razorpay_payment_id);
          } else {
            onError("Payment verification failed");
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        prefill: {
          name: `${shipping.firstName} ${shipping.lastName}`,
          email: shipping.email,
          contact: shipping.phone,
        },
        theme: {
          color: "#C4A45C",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      showToast("Payment failed. Please try again.");
      onError(String(err));
      setLoading(false);
    }
  };

  if (!hasKeys) {
    return (
      <div className="border border-qalb-black/10 rounded-md p-4 opacity-50">
        <label className="flex items-center gap-3 cursor-not-allowed">
          <input type="radio" name="payment" disabled className="accent-qalb-gold" />
          <div>
            <span className="text-sm font-medium text-qalb-black/60">Online Payment</span>
            <p className="text-xs text-qalb-black/30">Configure Razorpay keys to enable</p>
          </div>
        </label>
      </div>
    );
  }

  return (
    <div className="border border-qalb-black/10 rounded-md p-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          defaultChecked
          className="accent-qalb-gold"
        />
        <div>
          <span className="text-sm font-medium text-qalb-black/80">Online Payment (Razorpay)</span>
          <p className="text-xs text-qalb-black/40">Pay securely via UPI, Card, or Net Banking</p>
        </div>
      </label>
      <button
        onClick={handleRazorpayPayment}
        disabled={loading}
        className="mt-3 w-full flex items-center justify-center gap-2 py-3 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Opening Razorpay...
          </>
        ) : (
          `Pay ₹${amount.toLocaleString()}`
        )}
      </button>
    </div>
  );
}
