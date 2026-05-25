"use client";

import { useEffect, useState } from "react";
import { Package, Mail, Phone, MapPin, ChevronDown } from "lucide-react";

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
  status: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("qalb-admin") === "authed";
    }
    return false;
  });

  const handleLogin = () => {
    if (password === "qalb2024") {
      sessionStorage.setItem("qalb-admin", "authed");
      setAuthed(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders || []))
      .finally(() => setLoading(false));
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
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === "pending" ? "bg-amber-400" :
                      order.status === "shipped" ? "bg-blue-400" : "bg-green-400"
                    }`} />
                    <div>
                      <p className="font-mono text-xs sm:text-sm text-qalb-black/70">{order.order_reference}</p>
                      <p className="text-sm sm:text-base font-medium text-qalb-black mt-0.5">{order.customer_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-sm font-semibold text-qalb-black/70">₹{order.total.toLocaleString()}</span>
                    <span className={`text-[10px] sm:text-xs uppercase tracking-wider px-2 py-1 rounded ${
                      order.status === "pending" ? "bg-amber-50 text-amber-600" :
                      order.status === "shipped" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                    }`}>
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
                    <div className="border-t border-qalb-black/5 pt-3 mt-3">
                      <p className="text-xs text-qalb-black/40 uppercase tracking-wider mb-2">Items</p>
                      {order.items.map((item: { product: { name: string }; quantity: number }, i: number) => (
                        <div key={i} className="flex items-center justify-between py-1">
                          <span className="text-qalb-black/70">{item.product?.name || "Product"}</span>
                          <span className="text-qalb-black/50">x{item.quantity}</span>
                        </div>
                      ))}
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
