import { NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const razorpay = getRazorpayInstance();
    if (!razorpay) {
      return NextResponse.json(
        { success: false, message: "Razorpay not configured" },
        { status: 503 }
      );
    }

    const { amount, currency } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create payment" },
      { status: 500 }
    );
  }
}
