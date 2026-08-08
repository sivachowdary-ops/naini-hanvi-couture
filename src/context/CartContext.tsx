"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartLineItem, Product, MOCK_PRODUCTS, getProducts } from "@/lib/products";

type CartState = {
  items: CartLineItem[];
  isOpen: boolean; // Controls the cart drawer
  toastMessage: string | null;
  products: Product[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartLineItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; variantId?: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartLineItem[] }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "SHOW_TOAST"; payload: string }
  | { type: "HIDE_TOAST" }
  | { type: "SET_PRODUCTS"; payload: Product[] };

const initialState: CartState = {
  items: [],
  isOpen: false,
  toastMessage: null,
  products: MOCK_PRODUCTS,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (i) => i.productId === action.payload.productId && i.variantId === action.payload.variantId
      );
      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.productId === action.payload.productId && i.variantId === action.payload.variantId)
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId && i.variantId === action.payload.variantId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_CART":
      return { ...state, items: action.payload };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true, toastMessage: null };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "SHOW_TOAST":
      return { ...state, toastMessage: action.payload };
    case "HIDE_TOAST":
      return { ...state, toastMessage: null };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        dispatch({ type: "SET_CART", payload: JSON.parse(saved) });
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  // Fetch live products from database to ensure fresh prices/stock
  useEffect(() => {
    let active = true;
    async function loadLiveProducts() {
      try {
        const live = await getProducts();
        if (active && live && live.length > 0) {
          dispatch({ type: "SET_PRODUCTS", payload: live });
        }
      } catch (err) {
        console.error("Failed to load live products for cart context", err);
      }
    }
    loadLiveProducts();
    return () => {
      active = false;
    };
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state.items));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [state.items]);

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
