import { withBasePath } from "@/lib/site";
import type { ProductDTO } from "@/types/product";

export const categories = [
  { name: "Vitamines", slug: "vitamines", description: "Formats de démonstration autour des vitamines." },
  { name: "Minéraux", slug: "mineraux", description: "Formats de démonstration autour des minéraux." },
  { name: "Oméga-3", slug: "omega-3", description: "Formats de démonstration à base d’oméga-3." },
  { name: "Beauté & bien-être", slug: "beaute-bien-etre", description: "Sélection bien-être de démonstration." },
  { name: "Sport & nutrition", slug: "sport-nutrition", description: "Sélection sport de démonstration." },
] as const;

const regulatoryCopy = {
  composition: "Données fournisseur à intégrer et à vérifier avant commercialisation.",
  nutritionInfo: "Informations nutritionnelles en attente de validation fournisseur.",
  usageInfo: "Conseils d’utilisation en attente de validation fournisseur.",
  precautions: "Précautions spécifiques en attente de validation fournisseur.",
};

const rawProducts: ProductDTO[] = [
  {
    ...regulatoryCopy,
    id: "nuria-magnesium",
    name: "Magnésium Bisglycinate",
    slug: "magnesium-bisglycinate-60-gelules",
    sku: "NUR-MAG-001",
    brand: "NŪRIA Nutrition",
    format: "60 gélules",
    shortDescription: "Un format pratique de 60 gélules, présenté avec clarté et sobriété.",
    description: "Découvrez notre complément alimentaire au magnésium, présenté dans un format pratique de 60 gélules. Cette fiche est une démonstration à faire valider avant toute commercialisation.",
    priceMinor: 19900,
    currency: "MAD",
    isDemo: true,
    featured: true,
    category: { name: "Minéraux", slug: "mineraux" },
    images: [
      { url: "/images/magnesium-packshot-v2.png", alt: "Flacon NŪRIA Magnésium Bisglycinate — photographie produit" },
      { url: "/images/magnesium-side.svg", alt: "Flacon NŪRIA Magnésium — vue latérale" },
      { url: "/images/magnesium-label.svg", alt: "Concept d’étiquette NŪRIA" },
      { url: "/images/magnesium-lifestyle-v2.png", alt: "Flacon NŪRIA Magnésium dans un décor botanique" },
    ],
    stock: 50,
  },
  {
    ...regulatoryCopy,
    id: "nuria-vitamin-d3",
    name: "Vitamine D3",
    slug: "vitamine-d3-60-capsules",
    sku: "NUR-D3-002",
    brand: "NŪRIA Nutrition",
    format: "60 capsules",
    shortDescription: "Un concept produit minimaliste au format 60 capsules.",
    description: "Produit fictif de démonstration. Composition, dosage et précautions doivent être fournis et validés avant vente.",
    priceMinor: 15900,
    currency: "MAD",
    isDemo: true,
    featured: true,
    category: { name: "Vitamines", slug: "vitamines" },
    images: [{ url: "/images/vitamin-d3-packshot-v2.png", alt: "Flacon NŪRIA Vitamine D3 — photographie produit" }],
    stock: 32,
  },
  {
    ...regulatoryCopy,
    id: "nuria-omega-3",
    name: "Oméga-3 Marin",
    slug: "omega-3-marin-60-capsules",
    sku: "NUR-OMG-003",
    brand: "NŪRIA Nutrition",
    format: "60 capsules",
    shortDescription: "Une présentation premium pour un concept d’oméga-3 marin.",
    description: "Produit fictif de démonstration. Origine, composition et informations nutritionnelles restent à vérifier.",
    priceMinor: 22900,
    currency: "MAD",
    isDemo: true,
    featured: true,
    category: { name: "Oméga-3", slug: "omega-3" },
    images: [{ url: "/images/omega-3-packshot-v2.png", alt: "Flacon NŪRIA Oméga-3 Marin — photographie produit" }],
    stock: 24,
  },
  {
    ...regulatoryCopy,
    id: "nuria-beauty",
    name: "Complexe Beauté",
    slug: "complexe-beaute-30-gelules",
    sku: "NUR-BEA-004",
    brand: "NŪRIA Nutrition",
    format: "30 gélules",
    shortDescription: "Un concept de complément pour illustrer la collection bien-être.",
    description: "Produit fictif de démonstration sans allégation de santé. Formule et mentions réglementaires à définir.",
    priceMinor: 18900,
    currency: "MAD",
    isDemo: true,
    featured: false,
    category: { name: "Beauté & bien-être", slug: "beaute-bien-etre" },
    images: [{ url: "/images/beauty-packshot-v2.png", alt: "Flacon NŪRIA Complexe Beauté — photographie produit" }],
    stock: 18,
  },
  {
    ...regulatoryCopy,
    id: "nuria-multivitamins",
    name: "Multivitamines",
    slug: "multivitamines-60-gelules",
    sku: "NUR-MUL-005",
    brand: "NŪRIA Nutrition",
    format: "60 gélules",
    shortDescription: "Un concept multi-ingrédients pour démontrer la navigation du catalogue.",
    description: "Produit fictif de démonstration. Ingrédients, quantités et conseils d’utilisation sont à valider.",
    priceMinor: 20900,
    currency: "MAD",
    isDemo: true,
    featured: false,
    category: { name: "Vitamines", slug: "vitamines" },
    images: [{ url: "/images/multivitamins-packshot-v2.png", alt: "Flacon NŪRIA Multivitamines — photographie produit" }],
    stock: 40,
  },
  {
    ...regulatoryCopy,
    id: "nuria-protein",
    name: "Protéines Végétales",
    slug: "proteines-vegetales-vanille",
    sku: "NUR-PRT-006",
    brand: "NŪRIA Nutrition",
    format: "450 g",
    shortDescription: "Un concept de nutrition sportive au profil sobre et végétal.",
    description: "Produit fictif de démonstration. Profil nutritionnel, arômes et allergènes sont à documenter avant vente.",
    priceMinor: 27900,
    currency: "MAD",
    isDemo: true,
    featured: false,
    category: { name: "Sport & nutrition", slug: "sport-nutrition" },
    images: [{ url: "/images/protein-packshot-v2.png", alt: "Pot NŪRIA Protéines Végétales — photographie produit" }],
    stock: 15,
  },
];

export const products: ProductDTO[] = rawProducts.map((product) => ({
  ...product,
  images: product.images.map((image) => ({ ...image, url: withBasePath(image.url) })),
}));

export async function getProducts() {
  return products;
}

export async function getFeaturedProducts() {
  return products.filter((product) => product.featured).slice(0, 3);
}

export async function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug) || null;
}

export async function getCategoryProducts(slug: string) {
  return products.filter((product) => product.category?.slug === slug);
}
