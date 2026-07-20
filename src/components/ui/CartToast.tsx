"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function CartToast() {
  const { state, dispatch } = useCart();

  useEffect(() => {
    if (state.toastMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE_TOAST" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state.toastMessage, dispatch]);

  return (
    <div 
      className={cn(
        "fixed top-24 right-4 z-[100] transition-all duration-300 ease-out transform",
        state.toastMessage ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-success text-white shadow-lg rounded flex items-center gap-3 py-3 px-4 min-w-[280px]">
        <CheckCircle2 size={20} className="shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{state.toastMessage}</p>
        </div>
        <button 
          onClick={() => dispatch({ type: "OPEN_CART" })}
          className="text-xs font-bold underline underline-offset-2 hover:text-cream-base ml-2 shrink-0"
        >
          View Cart
        </button>
        <button 
          onClick={() => dispatch({ type: "HIDE_TOAST" })}
          className="ml-2 hover:bg-white/20 p-1 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
