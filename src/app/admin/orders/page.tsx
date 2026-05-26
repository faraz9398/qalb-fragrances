"use client";

import { useEffect, useState } from "react";
import { Package, Mail, Phone, MapPin, ChevronDown, Loader2 } from "lucide-react";

interface Order {
  id: string;
  order_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  items: { product: { name: string }; quantity: number }[];
  subtotal: number;
  total: number;
  payment_method?: string;
  payment_id?: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  processing: "bg-blue-50 text-blue-600 border-blue-200",
  shipped: "bg-purple-50 text-purple-600 border-purple-200",
  delivered: "bg-green-50 text-green-600 border-green-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

const statusDots: Record<string, string> = {
  pending: "bg-amber-400",
  processing: "bg-blue-400",
  shipped: "bg-purple-400",
  delivered: "bg-green-400",
  cancelled: "bg-red-400",
};

const nextStatuses: Record<string, string[]> = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("qalb-admin") === "authed";
    }
    return false;
  });

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/verify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("qalb-admin", "authed");
        setAuthed(true);
      }
    } catch {}
  };

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    if (!authed) return;
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-qalb-cream flex items-center justify-center px-4">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-sm w-full text-center">
          <Package size={32} className="mx-auto mb-4 text-qalb-gold" />
          <h1 className="font-heading text-xl text-qalb-black mb-4">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter password"
            className="w-full px-4 py-2.5 border border-qalb-black/10 rounded-md text-sm mb-3 focus:outline-none focus:border-qalb-gold/50"
          />
          <button
            onClick={handleLogin}
            className="w-full py-2.5 bg-qalb-black text-qalb-cream text-sm rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qalb-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl text-qalb-black">Orders</h1>
            <p className="text-sm text-qalb-black/40 mt-1">
              {loading ? "Loading..." : `${orders.length} order${orders.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="text-xs text-qalb-black/40 hover:text-qalb-gold transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("qalb-admin");
                setAuthed(false);
              }}
              className="text-xs text-qalb-black/40 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white rounded-lg animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package size={40} className="mx-auto text-qalb-black/20 mb-3" />
            <p className="text-qalb-black/40">No orders yet</p>
            <p className="text-xs text-qalb-black/30 mt-1">Orders will appear here after customers check out</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-qalb-black/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-2 h-2 rounded-full ${statusDots[order.status] || "bg-gray-400"}`} />
                    <div>
                      <p className="font-mono text-xs sm:text-sm text-qalb-black/70">{order.order_reference}</p>
                      <p className="text-sm sm:text-base font-medium text-qalb-black mt-0.5">{order.customer_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs text-qalb-black/40">{order.payment_method === "razorpay" ? "Online" : "COD"}</span>
                    <span className="text-sm font-semibold text-qalb-black/70">₹{order.total.toLocaleString()}</span>
                    <span className={`text-[10px] sm:text-xs uppercase tracking-wider px-2 py-1 rounded border ${statusColors[order.status] || "bg-gray-50 text-gray-600"}`}>
                      {order.status}
                    </span>
                    <ChevronDown size={16} className={`text-qalb-black/30 transition-transform ${expandedId === order.id ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {expandedId === order.id && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-qalb-black/5 pt-4 space-y-3 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-qalb-black/60">
                        <Mail size={14} />
                        {order.customer_email}
                      </div>
                      <div className="flex items-center gap-2 text-qalb-black/60">
                        <Phone size={14} />
                        {order.customer_phone}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-qalb-black/60">
                      <MapPin size={14} className="mt-0.5" />
                      <span>{order.shipping_address}, {order.shipping_city}, {order.shipping_state} {order.shipping_zip}</span>
                    </div>
                    {order.payment_id && (
                      <p className="text-xs text-qalb-black/40">
                        Payment ID: {order.payment_id}
                      </p>
                    )}
                    <div className="border-t border-qalb-black/5 pt-3 mt-3">
                      <p className="text-xs text-qalb-black/40 uppercase tracking-wider mb-2">Items</p>
                      {order.items.map((item: { product: { name: string }; quantity: number }, i: number) => (
                        <div key={i} className="flex items-center justify-between py-1">
                          <span className="text-qalb-black/70">{item.product?.name || "Product"}</span>
                          <span className="text-qalb-black/50">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-qalb-black/5 pt-3 mt-3">
                      <p className="text-xs text-qalb-black/40 uppercase tracking-wider mb-2">Update Status</p>
                      <div className="flex gap-2 flex-wrap">
                        {(nextStatuses[order.status] || []).map((nextStatus) => (
                          <button
                            key={nextStatus}
                            onClick={() => updateStatus(order.id, nextStatus)}
                            disabled={updatingId === order.id}
                            className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-md border transition-all disabled:opacity-50 ${
                              nextStatus === "cancelled"
                                ? "border-red-200 text-red-600 hover:bg-red-50"
                                : "border-qalb-black/10 text-qalb-black/60 hover:bg-qalb-black/5"
                            }`}
                          >
                            {updatingId === order.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              `Mark ${nextStatus}`
                            )}
                          </button>
                        ))}
                        {nextStatuses[order.status]?.length === 0 && (
                          <span className="text-xs text-qalb-black/30">Order complete</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-qalb-black/30 pt-2">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
