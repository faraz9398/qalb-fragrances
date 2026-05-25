import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({
        success: true,
        message: "Order recorded (demo mode)",
        orderId: `QALB-DEMO-${Date.now().toString(36).toUpperCase()}`,
      });
    }

    const body = await request.json();
    const { items, shipping, subtotal, shippingCost, total } = body;

    if (!items?.length || !shipping?.email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderReference = `QALB-${Date.now().toString(36).toUpperCase()}`;

    const { error } = await supabase.from("orders").insert({
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
      payment_method: "cod",
      status: "pending",
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
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
    if (!supabase) {
      return NextResponse.json({ orders: [] });
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ orders: data || [] });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
