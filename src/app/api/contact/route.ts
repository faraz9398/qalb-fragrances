import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message required" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json({
        success: true,
        message: "Message sent (demo mode)",
      });
    }

    const { error } = await supabase
      .from("messages")
      .insert({ name, email, subject, message });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Message sent! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
