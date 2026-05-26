import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { demoStore } from "@/lib/in-memory-store";

async function trySupabaseInsert(data: Record<string, unknown>, orderReference: string) {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from("orders").insert(data);
    if (error) {
      console.warn("Supabase insert failed:", error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shipping, subtotal, shippingCost, total, paymentMethod, paymentId } = body;

    if (!items?.length || !shipping?.email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderReference = `QALB-${Date.now().toString(36).toUpperCase()}`;
    const now = new Date().toISOString();

    const orderData = {
      order_reference: orderReference,
      customer_name: `${shipping.firstName} ${shipping.lastName}`,
      customer_email: shipping.email,
      customer_phone: shipping.phone,
      shipping_address: shipping.address,
      shipping_city: shipping.city,
      shipping_state: shipping.state,
      shipping_zip: shipping.zip,
      items,
      subtotal,
      shipping_cost: shippingCost,
      total,
      payment_method: paymentMethod || "cod",
      payment_id: paymentId,
      status: "pending",
    };

    const saved = await trySupabaseInsert(orderData, orderReference);

    demoStore.addOrder({
      id: orderReference,
      ...orderData,
      created_at: now,
    });

    return NextResponse.json({
      success: true,
      message: saved ? "Order recorded" : "Order recorded (demo mode)",
      orderId: orderReference,
    });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to place order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const localOrders = demoStore.getAllOrders();

    if (!supabase) {
      return NextResponse.json({ orders: localOrders });
    }

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const merged = [...data, ...localOrders];
        const seen = new Set(merged.map((o: { order_reference: string }) => o.order_reference));
        return NextResponse.json({ orders: Array.from(seen).map((ref) => merged.find((o: { order_reference: string }) => o.order_reference === ref)!) });
      }
    } catch (e) {
      console.warn("Supabase query failed, using demo store:", (e as Error).message);
    }

    return NextResponse.json({ orders: localOrders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
