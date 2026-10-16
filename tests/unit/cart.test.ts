// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/stores/cart";

const item = { productId: "product-1", slug: "produit", sku: "SKU-1", name: "Produit", format: "60 gélules", image: "/image.svg", priceMinor: 19900, currency: "MAD", stock: 3 };

describe("panier persistant", () => {
  beforeEach(() => { localStorage.clear(); useCartStore.setState({ items: [], drawerOpen: false }); });
  it("calcule le sous-total en unités monétaires mineures", () => {
    useCartStore.getState().addItem(item, 2);
    expect(useCartStore.getState().subtotal()).toBe(39800);
    expect(useCartStore.getState().totalQuantity()).toBe(2);
  });
  it("borne la quantité au stock et empêche les quantités négatives", () => {
    useCartStore.getState().addItem(item, 10);
    expect(useCartStore.getState().items[0].quantity).toBe(3);
    useCartStore.getState().setQuantity(item.productId, -2);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });
  it("retire un produit", () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().removeItem(item.productId);
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
