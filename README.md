# NŪRIA Nutrition

Vitrine e-commerce statique en français (`fr-MA`) pour une marque fictive de compléments alimentaires destinée au marché marocain.

Le site public est déployé sur GitHub Pages : <https://geekhoussam.github.io/nuria-nutrition/>

> Tous les produits, prix et contenus réglementés sont des données de démonstration. Ils doivent être validés avant toute commercialisation.

## Fonctionnalités de la démo publique

- Homepage éditoriale responsive.
- Six photographies produit réalistes.
- Catalogue filtrable avec recherche, tri, disponibilité et aperçu rapide.
- Fiches produit générées statiquement avec une vue 3D spécifique à chaque produit.
- Galerie, zoom, catégories, conseils, FAQ, pages éditoriales et légales.
- Panier persistant dans le navigateur, sans envoi de données.
- Sitemap, robots et données structurées générés au build.

GitHub Pages ne fournit pas de serveur applicatif. Les comptes, l’administration, la base MySQL, les formulaires et les commandes sont donc explicitement désactivés sur `main`. La version Next.js/MySQL complète est préservée dans la branche `full-stack`.

## Lancer le projet localement

Prérequis : Node.js 24 et pnpm 11.

```bash
pnpm install
pnpm dev
```

Ouvrez <http://localhost:3000>.

Pour vérifier exactement la version publiée sous le sous-chemin GitHub Pages :

```bash
NEXT_PUBLIC_BASE_PATH=/nuria-nutrition \
NEXT_PUBLIC_SITE_URL=https://geekhoussam.github.io/nuria-nutrition \
pnpm build
```

Le site exporté est écrit dans `out/`.

## Vérifications

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Déploiement GitHub Pages

Le workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) :

1. installe les dépendances avec le lockfile ;
2. construit l’export statique avec le bon `basePath` ;
3. charge le dossier `out/` comme artefact Pages ;
4. publie automatiquement après chaque push sur `main`.

La source GitHub Pages du dépôt doit être réglée sur **GitHub Actions**.

## Limites

- Aucune commande, transaction, livraison ou inscription réelle.
- Aucun compte, espace administrateur ou stockage serveur.
- Les formulaires de contact et de newsletter ne collectent rien.
- Les favoris et le panier restent locaux au navigateur.
- Les textes légaux sont des brouillons.
- Toutes les données produit réglementées restent à vérifier.
