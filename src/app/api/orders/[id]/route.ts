import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { demoStore } from "@/lib/in-memory-store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const localOrder = demoStore.updateOrderStatus(id, status);
    if (localOrder) {
      return NextResponse.json({ success: true, order: localOrder });
    }

    if (!supabase) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const { error, data } = await supabase
      .from("orders")
      .update({ status })
      .eq("order_reference", id)
      .select();

    if (error) {
      console.warn("Supabase update failed:", error.message);
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const order = data?.[0];
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 }
    );
  }
}
