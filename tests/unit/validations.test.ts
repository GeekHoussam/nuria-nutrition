import { describe, expect, it } from "vitest";
import { checkoutSchema, newsletterSchema, registrationSchema } from "@/lib/validations";

const validCheckout = {
  idempotencyKey: "0178a4b0-83c2-4f81-9b9c-50f9b99afb44",
  customer: { fullName: "Nadia Exemple", email: "nadia@example.com", phone: "+212 600 000 000" },
  delivery: { addressLine1: "10 rue des Jardins", addressLine2: "", city: "Rabat", postalCode: "10000", instructions: "", method: "standard" },
  paymentMethod: "MOCK_ONLINE",
  items: [{ productId: "cm12345678901234567890123", quantity: 2 }],
};

describe("validation des formulaires", () => {
  it("accepte une commande cohérente", () => expect(checkoutSchema.safeParse(validCheckout).success).toBe(true));
  it("refuse un panier vide et une quantité négative", () => {
    expect(checkoutSchema.safeParse({ ...validCheckout, items: [] }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...validCheckout, items: [{ productId: "cm12345678901234567890123", quantity: -1 }] }).success).toBe(false);
  });
  it("exige un consentement newsletter explicite", () => expect(newsletterSchema.safeParse({ email: "test@example.com", consent: false }).success).toBe(false));
  it("exige un mot de passe robuste", () => expect(registrationSchema.safeParse({ name: "Nadia", email: "nadia@example.com", password: "faible" }).success).toBe(false));
});
