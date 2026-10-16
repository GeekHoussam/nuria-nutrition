# NŪRIA Nutrition

Prototype e-commerce premium en français (`fr-MA`) pour une marque fictive de compléments alimentaires destinée au marché marocain. Il inclut un parcours vertical complet, de la découverte du produit jusqu’à la commande persistée en MySQL.

> Tous les produits et contenus réglementés sont des données de démonstration. Ils doivent être vérifiés par le fournisseur et revus juridiquement avant toute commercialisation.

## Fonctionnalités

- Homepage éditoriale responsive avec flacon 3D procédural et fallback statique.
- Catalogue MySQL filtrable, recherche, tri, disponibilité, aperçu rapide et catégories.
- Fiche produit avec galerie, zoom, vue 3D, accordéons réglementaires et favoris visuels.
- Panier Zustand persistant, quantités bornées au stock et calculs en centimes.
- Checkout invité ou connecté avec validation Zod, revalidation serveur des prix et transaction de stock atomique.
- Confirmation protégée par jeton pour les invités ; historique privé pour les clients connectés.
- Authentification par identifiants, mots de passe hachés avec bcrypt et sessions JWT sécurisées via Auth.js.
- Administration protégée par rôle : indicateurs, produits, prix, stock, images, commandes et clients en lecture seule.
- Newsletter, messages de contact, adresses client, sitemap, robots, JSON-LD et pages légales brouillon.
- Tests Vitest (unitaires et intégration MySQL) et Playwright (desktop + mobile).

## Prérequis

- Node.js 24 ou version LTS compatible avec Next.js 16
- pnpm 11+
- Docker Desktop ou un serveur MySQL 8.4 compatible

## Installation

```bash
pnpm install
cp .env.example .env
docker compose up -d mysql
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Le service Docker expose MySQL sur `127.0.0.1:3307` pour éviter un conflit avec une installation locale. Le volume `nuria_mysql_data` conserve les données. Le script d’initialisation crée aussi `nuria_shadow`, utilisé uniquement par Prisma Migrate en développement.

## Variables d’environnement

| Variable | Usage |
| --- | --- |
| `DATABASE_URL` | Connexion à la base applicative MySQL |
| `SHADOW_DATABASE_URL` | Base temporaire de Prisma Migrate |
| `AUTH_SECRET` | Secret de session et de protection des confirmations (32 caractères minimum) |
| `AUTH_TRUST_HOST` | Autorise l’hôte local derrière le serveur Next.js |
| `NEXT_PUBLIC_SITE_URL` | URL canonique, sitemap et métadonnées |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Identifiants créés ou mis à jour par le seed |
| `ENABLE_*` | Active/désactive les trois moyens de paiement prototype |

Ne versionnez jamais `.env` ni un secret réel.

## Base de données

```bash
pnpm db:generate   # génère le client Prisma
pnpm db:migrate    # crée/applique une migration de développement
pnpm db:deploy     # applique les migrations en déploiement
pnpm db:seed       # catalogue démo + administrateur
pnpm db:reset      # efface et recrée la base de développement (destructif)
```

Le schéma utilise des entiers en unités monétaires mineures (`priceMinor`) : aucun calcul financier n’emploie de flottants. Les lignes de commande conservent un instantané du nom, SKU et prix unitaire.

## Compte administrateur de démonstration

Après le seed, connectez-vous à `/connexion` avec les valeurs `ADMIN_EMAIL` et `ADMIN_PASSWORD` de votre fichier `.env`, puis ouvrez `/admin`. Modifiez impérativement ces valeurs hors développement.

## Vérifications

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm exec playwright install chromium   # une seule fois
pnpm test:e2e
```

Les tests d’intégration et E2E nécessitent MySQL et le seed. Les tests de commande restaurent le stock qu’ils utilisent ; l’E2E crée une commande de démonstration persistante.

## Architecture

- `src/app` : routes App Router, APIs, espace compte et administration.
- `src/components` : UI, layout, produit, panier, checkout et expérience 3D.
- `src/server` : services produits et commandes, indépendants des pages.
- `src/lib` : Prisma, authentification, validation, limitation de débit et utilitaires.
- `prisma` : schéma normalisé, migration versionnée et seed idempotent.
- `tests` : unités, intégration MySQL et parcours Playwright.

## Déploiement

1. Fournir un MySQL managé accessible depuis le runtime Next.js.
2. Définir les variables d’environnement de production avec un nouveau `AUTH_SECRET`.
3. Exécuter `pnpm db:deploy`, puis `pnpm build` et `pnpm start`.
4. Configurer HTTPS, sauvegardes, observabilité, e-mails transactionnels, stockage d’images objet et fournisseur de paiement marocain.
5. Effectuer audits sécurité, accessibilité, performance, juridique et réglementaire avant ouverture.

Le projet produit une sortie Next.js `standalone` adaptée à un conteneur Node. Il n’est pas publié sur Sites, car l’exigence MySQL repose sur une connexion TCP non disponible dans ce runtime serverless.

### Railway

1. Créer un projet Railway vide et y ajouter une base MySQL.
2. Ajouter ce dépôt GitHub comme service applicatif.
3. Définir `DATABASE_URL` avec une référence vers `MySQL.MYSQL_URL` et définir les autres variables de `.env.example`. `SHADOW_DATABASE_URL` peut rester vide en production.
4. Configurer `pnpm deploy:prepare` comme commande de pré-déploiement et `/api/health` comme chemin de contrôle de santé.
5. Après la première migration, exécuter `pnpm db:seed` une seule fois pour créer le catalogue et le compte administrateur. Ne pas l’ajouter à la commande de pré-déploiement : le seed réinitialise les stocks de démonstration.
6. Générer un domaine public, définir `NEXT_PUBLIC_SITE_URL` avec son URL HTTPS, puis redéployer afin d’intégrer l’URL canonique au build.

## Limites connues du prototype

- Aucun paiement, e-mail marketing ou e-mail transactionnel réel.
- Frais et délais de livraison à configurer ; ils ne sont pas facturés dans le flux test.
- Réinitialisation du mot de passe préparée côté UX, en attente d’un fournisseur d’e-mail.
- Images importées stockées localement ; utiliser un stockage objet avec analyse de sécurité en production.
- Favoris visuels anonymes ; la persistance du modèle `Wishlist` peut être reliée au compte dans une itération suivante.
- Les textes légaux sont des brouillons et toutes les données produit réglementées restent à valider.
- Le limiteur de débit en mémoire doit être remplacé par un stockage partagé en déploiement multi-instance.
