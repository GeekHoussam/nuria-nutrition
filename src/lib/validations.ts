import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(8, "Numéro de téléphone incomplet")
  .max(24, "Numéro de téléphone trop long")
  .regex(/^[+\d\s().-]+$/, "Format de téléphone invalide");

export const newsletterSchema = z.object({
  email: z.string().trim().email("Adresse e-mail invalide").max(254),
  consent: z.literal(true, { error: "Votre consentement est requis" }),
});

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide").max(254),
  password: z
    .string()
    .min(10, "Utilisez au moins 10 caractères")
    .max(128)
    .regex(/[A-Z]/, "Ajoutez une majuscule")
    .regex(/[a-z]/, "Ajoutez une minuscule")
    .regex(/[0-9]/, "Ajoutez un chiffre"),
});

export const checkoutSchema = z.object({
  idempotencyKey: z.string().uuid(),
  customer: z.object({
    fullName: z.string().trim().min(2, "Nom complet requis").max(120),
    email: z.string().trim().toLowerCase().email("Adresse e-mail invalide").max(254),
    phone,
  }),
  delivery: z.object({
    addressLine1: z.string().trim().min(5, "Adresse requise").max(180),
    addressLine2: z.string().trim().max(180).optional().or(z.literal("")),
    city: z.string().trim().min(2, "Ville requise").max(100),
    postalCode: z.string().trim().max(20).optional().or(z.literal("")),
    instructions: z.string().trim().max(500).optional().or(z.literal("")),
    method: z.literal("standard"),
  }),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "BANK_TRANSFER", "MOCK_ONLINE"]),
  items: z
    .array(
      z.object({
        productId: z.string().cuid(),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1, "Votre panier est vide")
    .max(20),
});

export const addressSchema = z.object({
  label: z.string().trim().min(2).max(50),
  fullName: z.string().trim().min(2).max(120),
  phone,
  line1: z.string().trim().min(5).max(180),
  line2: z.string().trim().max(180).optional(),
  city: z.string().trim().min(2).max(100),
  postalCode: z.string().trim().max(20).optional(),
});

export const productAdminSchema = z.object({
  name: z.string().trim().min(2).max(140),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sku: z.string().trim().min(3).max(50),
  format: z.string().trim().min(2).max(100),
  shortDescription: z.string().trim().min(10).max(300),
  description: z.string().trim().min(10).max(3000),
  priceMad: z.coerce.number().int().min(1).max(100000),
  stock: z.coerce.number().int().min(0).max(100000),
  categorySlug: z.string().trim().min(2),
  imageUrl: z
    .string()
    .trim()
    .refine((value) => value.startsWith("/") || value.startsWith("https://"), "URL d’image invalide"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
