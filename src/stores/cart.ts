"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  sku: string;
  name: string;
  format: string;
  image: string;
  priceMinor: number;
  currency: string;
  stock: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  drawerOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalQuantity: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const current = state.items.find((entry) => entry.productId === item.productId);
          const nextQuantity = Math.min(item.stock, Math.max(1, (current?.quantity ?? 0) + quantity));
          return {
            drawerOpen: true,
            items: current
              ? state.items.map((entry) => (entry.productId === item.productId ? { ...entry, ...item, quantity: nextQuantity } : entry))
              : [...state.items, { ...item, quantity: Math.min(item.stock, Math.max(1, quantity)) }],
          };
        }),
      removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      setQuantity: (productId, quantity) => set((state) => ({ items: state.items.map((item) => item.productId === productId ? { ...item, quantity: Math.min(item.stock, Math.max(1, quantity)) } : item) })),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      totalQuantity: () => get().items.reduce((total, item) => total + item.quantity, 0),
      subtotal: () => get().items.reduce((total, item) => total + item.priceMinor * item.quantity, 0),
    }),
    { name: "nuria-cart-v1", partialize: (state) => ({ items: state.items }) },
  ),
);
