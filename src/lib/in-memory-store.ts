import fs from "fs";
import path from "path";

interface StoredOrder {
  id: string;
  order_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  items: { product: { name: string }; quantity: number; price?: number }[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: string;
  payment_id?: string;
  status: string;
  created_at: string;
}

const dbPath = path.join("/tmp", "qalb-orders.json");

function readDb(): StoredOrder[] {
  try {
    if (fs.existsSync(dbPath)) {
      return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    }
  } catch {}
  return [];
}

function writeDb(orders: StoredOrder[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(orders), "utf-8");
  } catch {}
}

export const demoStore = {
  addOrder(order: StoredOrder) {
    const orders = readDb();
    orders.push(order);
    writeDb(orders);
    return order;
  },

  getOrder(id: string) {
    const orders = readDb();
    return orders.find((o) => o.id === id) || null;
  },

  getAllOrders() {
    return readDb().sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  updateOrderStatus(id: string, status: string) {
    const orders = readDb();
    const order = orders.find((o) => o.id === id);
    if (!order) return null;
    order.status = status;
    writeDb(orders);
    return order;
  },
};
