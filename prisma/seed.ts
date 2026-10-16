import { PrismaClient, ProductStatus, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  ["Vitamines", "vitamines", "Formats de démonstration autour des vitamines."],
  ["Minéraux", "mineraux", "Formats de démonstration autour des minéraux."],
  ["Oméga-3", "omega-3", "Formats de démonstration à base d’oméga-3."],
  ["Beauté & bien-être", "beaute-bien-etre", "Sélection bien-être de démonstration."],
  ["Sport & nutrition", "sport-nutrition", "Sélection sport de démonstration."],
] as const;

const products = [
  {
    name: "Magnésium Bisglycinate",
    slug: "magnesium-bisglycinate-60-gelules",
    sku: "NUR-MAG-001",
    format: "60 gélules",
    category: "mineraux",
    priceMinor: 19900,
    stock: 50,
    featured: true,
    shortDescription: "Un format pratique de 60 gélules, présenté avec clarté et sobriété.",
    description:
      "Découvrez notre complément alimentaire au magnésium, présenté dans un format pratique de 60 gélules. Ce produit est une démonstration : sa fiche réglementaire doit être complétée et validée par le fournisseur avant toute commercialisation.",
    images: [
      ["/images/magnesium-packshot-v2.png", "Flacon NŪRIA Magnésium Bisglycinate — photographie produit"],
      ["/images/magnesium-side.svg", "Flacon NŪRIA Magnésium — vue latérale"],
      ["/images/magnesium-label.svg", "Concept d’étiquette NŪRIA — données à vérifier"],
      ["/images/magnesium-lifestyle-v2.png", "Flacon NŪRIA Magnésium dans un décor botanique — photographie produit"],
    ],
  },
  {
    name: "Vitamine D3",
    slug: "vitamine-d3-60-capsules",
    sku: "NUR-D3-002",
    format: "60 capsules",
    category: "vitamines",
    priceMinor: 15900,
    stock: 32,
    featured: true,
    shortDescription: "Un concept produit minimaliste au format 60 capsules.",
    description: "Produit fictif de démonstration. Composition, dosage et précautions doivent être fournis et validés avant vente.",
    images: [["/images/vitamin-d3-packshot-v2.png", "Flacon NŪRIA Vitamine D3 — photographie produit"]],
  },
  {
    name: "Oméga-3 Marin",
    slug: "omega-3-marin-60-capsules",
    sku: "NUR-OMG-003",
    format: "60 capsules",
    category: "omega-3",
    priceMinor: 22900,
    stock: 24,
    featured: true,
    shortDescription: "Une présentation premium pour un concept d’oméga-3 marin.",
    description: "Produit fictif de démonstration. Origine, composition et informations nutritionnelles restent à vérifier.",
    images: [["/images/omega-3-packshot-v2.png", "Flacon NŪRIA Oméga-3 Marin — photographie produit"]],
  },
  {
    name: "Complexe Beauté",
    slug: "complexe-beaute-30-gelules",
    sku: "NUR-BEA-004",
    format: "30 gélules",
    category: "beaute-bien-etre",
    priceMinor: 18900,
    stock: 18,
    featured: false,
    shortDescription: "Un concept de complément pour illustrer la collection bien-être.",
    description: "Produit fictif de démonstration sans allégation de santé. Formule et mentions réglementaires à définir.",
    images: [["/images/beauty-packshot-v2.png", "Flacon NŪRIA Complexe Beauté — photographie produit"]],
  },
  {
    name: "Multivitamines",
    slug: "multivitamines-60-gelules",
    sku: "NUR-MUL-005",
    format: "60 gélules",
    category: "vitamines",
    priceMinor: 20900,
    stock: 40,
    featured: false,
    shortDescription: "Un concept multi-ingrédients pour démontrer la navigation du catalogue.",
    description: "Produit fictif de démonstration. Ingrédients, quantités et conseils d’utilisation sont à valider.",
    images: [["/images/multivitamins-packshot-v2.png", "Flacon NŪRIA Multivitamines — photographie produit"]],
  },
  {
    name: "Protéines Végétales",
    slug: "proteines-vegetales-vanille",
    sku: "NUR-PRT-006",
    format: "450 g",
    category: "sport-nutrition",
    priceMinor: 27900,
    stock: 15,
    featured: false,
    shortDescription: "Un concept de nutrition sportive au profil sobre et végétal.",
    description: "Produit fictif de démonstration. Profil nutritionnel, arômes et allergènes sont à documenter avant vente.",
    images: [["/images/protein-packshot-v2.png", "Pot NŪRIA Protéines Végétales — photographie produit"]],
  },
] as const;

async function main() {
  const categoryIds = new Map<string, string>();
  for (const [name, slug, description] of categories) {
    const category = await prisma.category.upsert({
      where: { slug },
      update: { name, description },
      create: { name, slug, description },
    });
    categoryIds.set(slug, category.id);
  }

  for (const product of products) {
    const categoryId = categoryIds.get(product.category)!;
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        slug: product.slug,
        format: product.format,
        priceMinor: product.priceMinor,
        shortDescription: product.shortDescription,
        description: product.description,
        composition: "Données fournisseur à intégrer et à vérifier avant commercialisation.",
        nutritionInfo: "Informations nutritionnelles en attente de validation fournisseur.",
        usageInfo: "Conseils d’utilisation en attente de validation fournisseur.",
        precautions: "Précautions spécifiques en attente de validation fournisseur. Demandez conseil à un professionnel qualifié si nécessaire.",
        isDemo: true,
        featured: product.featured,
        status: ProductStatus.ACTIVE,
        inventory: { upsert: { create: { quantity: product.stock }, update: { quantity: product.stock } } },
        images: {
          deleteMany: {},
          create: product.images.map(([url, alt], sortOrder) => ({ url, alt, sortOrder })),
        },
        categories: { deleteMany: {}, create: { categoryId } },
      },
      create: {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        format: product.format,
        priceMinor: product.priceMinor,
        shortDescription: product.shortDescription,
        description: product.description,
        composition: "Données fournisseur à intégrer et à vérifier avant commercialisation.",
        nutritionInfo: "Informations nutritionnelles en attente de validation fournisseur.",
        usageInfo: "Conseils d’utilisation en attente de validation fournisseur.",
        precautions: "Précautions spécifiques en attente de validation fournisseur. Demandez conseil à un professionnel qualifié si nécessaire.",
        isDemo: true,
        featured: product.featured,
        status: ProductStatus.ACTIVE,
        inventory: { create: { quantity: product.stock } },
        images: { create: product.images.map(([url, alt], sortOrder) => ({ url, alt, sortOrder })) },
        categories: { create: { categoryId } },
      },
    });
  }

  const email = (process.env.ADMIN_EMAIL || "admin@nuria.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "NuriaDemo2026!";
  await prisma.user.upsert({
    where: { email },
    update: { role: Role.ADMIN, name: "Administration NŪRIA", passwordHash: await hash(password, 12) },
    create: { email, name: "Administration NŪRIA", role: Role.ADMIN, passwordHash: await hash(password, 12) },
  });

  console.info(`Seed terminé : ${products.length} produits de démonstration et 1 compte administrateur.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
