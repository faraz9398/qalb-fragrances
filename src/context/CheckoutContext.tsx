"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ShippingInfo } from "@/types";

interface CheckoutContextType {
  step: number;
  setStep: (step: number) => void;
  shipping: ShippingInfo;
  setShipping: (info: ShippingInfo) => void;
  orderId: string;
  setOrderId: (id: string) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  return (
    <CheckoutContext.Provider
      value={{ step, setStep, shipping, setShipping, orderId, setOrderId }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
  return context;
}
