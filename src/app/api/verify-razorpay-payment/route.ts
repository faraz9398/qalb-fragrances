import { NextResponse } from "next/server";
import crypto from "crypto";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const { orderId, paymentId, signature } = await request.json();

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment details" },
        { status: 400 }
      );
    }

    const secret = env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Razorpay not configured" },
        { status: 503 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}
