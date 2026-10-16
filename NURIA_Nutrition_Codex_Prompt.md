# NŪRIA Nutrition — Complete Codex Build Prompt

> **Project:** Premium food supplements e-commerce website  
> **Storefront language:** French (`fr-MA`)  
> **Initial market:** Morocco  
> **Currency:** MAD  
> **Reference stack:** Next.js · TypeScript · Tailwind CSS · shadcn/ui · Three.js · React Three Fiber · MySQL · Prisma

## Primary prompt — Build the complete application

Copy the full instructions below into Codex. The primary goal is a working end-to-end store, beginning with a premium product prototype.

---

### ROLE

You are a senior full-stack engineer, e-commerce architect, expert UI/UX designer, creative frontend developer, and 3D web animation specialist.

Your mission is to **DESIGN AND BUILD** a complete, modern, premium, scalable e-commerce website for a food supplements brand.

The website must be visually exceptional, technically robust, fast, responsive, SEO-friendly, accessible, and ready to evolve into a production e-commerce platform.

**IMPORTANT:** Do not just generate a plan or static mockup.

Implement a **REAL, FUNCTIONAL WEBSITE** with actual pages, working navigation, functional cart, database models, product details, and a realistic checkout workflow.

Use the repository as your working project.

Before implementation:
- Inspect the existing repository.
- Reuse appropriate existing technologies if already present.
- Identify missing dependencies.
- Establish the implementation architecture.
- Then start building the application.

Do not stop after generating the homepage.

---

## 1. PROJECT OVERVIEW

**PROJECT NAME:** NŪRIA Nutrition  
**BUSINESS TYPE:** Premium food supplements e-commerce store.  
**WEBSITE LANGUAGE:** French (`fr-MA`).  
**INITIAL MARKET:** Morocco.  
**CURRENCY:** MAD (Moroccan Dirham).

**TARGET AUDIENCE:** Adults interested in nutrition, wellness, healthy lifestyles, and premium dietary supplements.

**BRAND POSITIONING:** Premium, Natural, Scientific, Modern, Trustworthy, Minimalist, Elegant.

**GOAL:** Build a beautiful, high-converting online wellness store that feels like a premium international brand.

The website should combine:
- Elegant editorial design.
- Modern e-commerce functionality.
- Smooth 3D product animations.
- Premium typography.
- Excellent mobile experience.
- Fast navigation.
- Strong accessibility.
- Clear product storytelling.
- Trustworthy ingredient information.
- Robust scalable architecture.

The website must look like a real premium business, not like a generic development template.

## 2. TECHNOLOGY STACK

Use the following technology stack:

**FRONTEND:**
- Next.js with App Router.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Lucide icons.

**ANIMATIONS:**
- Motion for React.
- GSAP only where advanced animation is justified.
- Three.js.
- React Three Fiber.
- Drei utilities.

**BACKEND:**
- Next.js Server Actions.
- Route Handlers for required APIs.
- Zod for request and form validation.
- Modular server-side services.

**DATABASE:**
- MySQL.
- Prisma ORM.
- Versioned database migrations.
- Seed scripts.

**AUTHENTICATION:**
- Auth.js or another well-maintained, secure authentication solution.

**STATE MANAGEMENT:**
- Zustand when client state is needed.
- Prefer server-driven data where practical.

**TESTING:**
- Vitest.
- React Testing Library.
- Playwright.

**DEVELOPMENT:**
- ESLint.
- Prettier.
- Docker Compose for local MySQL.
- Environment variable configuration.

Use mutually compatible, actively maintained stable versions of dependencies.

Avoid unnecessary libraries and architectural complexity.

The final website must be maintainable by a professional engineering team.

## 3. DESIGN SYSTEM & VISUAL IDENTITY

Create a complete design system for NŪRIA Nutrition.

**DESIGN DIRECTION:** Premium botanical wellness meets modern science.

**Visual inspiration:**
- Apple product storytelling.
- Aesop editorial presentation.
- Premium European wellness brands.
- High-end skincare e-commerce stores.
- Minimal luxury product photography.

Do not copy any existing brand's protected assets, logos, or layouts.

**COLOR PALETTE:**

| Role | Color | Hex |
|---|---|---|
| Primary | Deep Botanical Green | `#173E36` |
| Secondary | Soft Sage Green | `#DDE7D8` |
| Background | Warm Ivory | `#F8F5EE` |
| Accent | Muted Gold | `#C2A16A` |
| Text | Dark Charcoal | `#202521` |
| Surface | White | `#FFFFFF` |

Use elegant color combinations, subtle gradients, and restrained highlights.

**TYPOGRAPHY:** Use a premium typography pairing, such as Manrope (or similar) for interface text and an elegant serif for selected editorial headings. Typography should feel luxurious, readable, modern, and sophisticated.

Create a consistent design system containing:
- Typography scale.
- Color tokens.
- Spacing scale.
- Border radii.
- Shadows.
- Buttons.
- Inputs.
- Cards.
- Navigation components.
- Form components.
- Product cards.
- Badges.
- Dialogs.
- Drawers.
- Toast notifications.
- Skeleton loading states.

**DESIGN REQUIREMENTS:**
- Strong visual hierarchy.
- Generous whitespace.
- High-quality responsive layouts.
- Subtle micro-interactions.
- Elegant hover effects.
- Modern product cards.
- Premium imagery.
- Consistent iconography.
- Clean and uncluttered interface.

**AVOID:**
- Generic Bootstrap-like layouts.
- Excessive shadows.
- Oversaturated gradients.
- Too many colors.
- Heavy animations everywhere.
- Low-quality placeholder images.
- Inconsistent spacing.
- Generic AI-looking design.

Create a coherent and distinctive brand identity.

## 4. HOMEPAGE — PREMIUM IMMERSIVE EXPERIENCE

The homepage is the most important visual element. It must immediately communicate that NŪRIA is a premium food supplements brand.

### Section 1 — Navigation

Elegant sticky navigation.

- **Left:** NŪRIA brand logo.
- **Center:** Accueil · Boutique · Nos ingrédients · Notre philosophie · Conseils · Contact.
- **Right:** Search icon · Account icon · Shopping cart · Cart quantity badge.
- **Desktop:** Elegant horizontal navigation.
- **Mobile:** Beautiful animated mobile menu.

Add a tasteful announcement bar: **« Livraison partout au Maroc »**.

Do not invent shipping offers or thresholds.

### Section 2 — Immersive hero

Build a full-width premium hero section.

**Main heading:**

> Votre bien-être,  
> notre essentiel.

**Subtitle:**

> Découvrez une approche moderne de la complémentation alimentaire.

**Primary CTA:** « Découvrir la collection »  
**Secondary CTA:** « Notre philosophie »

**VISUAL:** Create a high-quality 3D representation of the featured supplement bottle.

The product bottle should:
- Float subtly.
- Rotate gently.
- React to pointer movement on desktop.
- Have realistic materials.
- Cast soft shadows.
- Use studio-quality lighting.
- Display a beautiful branded label.
- Fit naturally into the composition.

Use React Three Fiber and Drei. The product must feel like a luxury product advertisement.

**ANIMATION:**

On page load:
- Heading fades in smoothly.
- Product enters with subtle scale and rotation.
- Background elements animate gently.
- CTA buttons reveal sequentially.

On scroll:
- Product transitions smoothly.
- Content reveals with refined movement.
- Subtle parallax adds depth.

Ensure animations do not block navigation or harm readability. Respect `prefers-reduced-motion`. For low-performance devices, provide a static visual fallback.

### Section 3 — Trust & quality

Display a beautiful horizontal section highlighting:
- Transparence des informations
- Sélection des ingrédients
- Expérience pensée pour vous
- Livraison au Maroc

Use elegant icons and subtle animations. Only make claims that the business can substantiate.

### Section 4 — Featured products

**Title:** « Découvrez nos essentiels »  
**Subtitle:** « Une sélection pensée pour accompagner votre quotidien. »

Create a responsive product grid. Product cards should contain:
- Product visual.
- Product name.
- Category.
- Price in MAD.
- Short product description.
- Add-to-cart button.
- Quick-view action.
- Product detail link.

Add tasteful hover interactions.

### Section 5 — Ingredient storytelling

Create an editorial storytelling section.

**Title:** « La transparence au cœur de notre démarche. »

Use:
- Large product imagery.
- Natural textures.
- Elegant typography.
- Ingredient-focused visual storytelling.
- Scroll-triggered transitions.

Explain the brand's approach without making unsupported scientific claims.

### Section 6 — Product showcase

Create a premium full-width featured product section. Display:
- Large 3D bottle.
- Product title.
- Concise description.
- Key product information.
- Price.
- CTA.

Add an interactive visual transition.

### Section 7 — How to choose

Create an educational section titled **« Comment choisir vos compléments ? »** with editorial cards covering:
- Comprendre les ingrédients
- Lire une étiquette
- Choisir selon ses besoins
- Conseils d'utilisation responsable

Each card should link to an article or guide.

### Section 8 — Newsletter

Premium newsletter section.

**Heading:** « Le bien-être commence ici. »  
**Description:** « Recevez nos actualités et conseils. »

Include an email input, subscribe button, and consent checkbox. Create a working submission flow with validation, consent storage, and success/error feedback.

Do not send real marketing emails without a configured provider and appropriate consent.

### Section 9 — Footer

Professional multi-column footer.

- **Boutique:** Tous les produits · Nouveautés · Catégories
- **Informations:** Notre histoire · Nos ingrédients · Conseils
- **Service client:** Livraison · Retours · FAQ · Contact
- **Légal:** Mentions légales · Conditions générales de vente · Politique de confidentialité · Politique de cookies

Include social media icons and an appropriate statement explaining that food supplements are not substitutes for a varied, balanced diet and healthy lifestyle.

Legal text must be configurable and reviewed before production publication.

## 5. FIRST COMPLETE PRODUCT PROTOTYPE

Create **ONE FULLY IMPLEMENTED DEMONSTRATION PRODUCT**. The product must be integrated throughout the application.

| Field | Value |
|---|---|
| Brand | NŪRIA Nutrition |
| Name | Magnésium Bisglycinate |
| Format | 60 gélules |
| Category | Minéraux |
| Price | 199 MAD |
| SKU | `NUR-MAG-001` |
| Stock | 50 units (demo inventory) |
| Slug | `magnesium-bisglycinate-60-gelules` |

**Product description:**

> Découvrez notre complément alimentaire au magnésium, présenté dans un format pratique de 60 gélules.

**IMPORTANT:** This is a fictional demonstration product.

Do **not** invent:
- Certified health benefits.
- Clinical study results.
- Regulatory approvals.
- Laboratory results.
- Exact active ingredient quantities.
- Nutritional reference values.
- Dosage recommendations.
- Certifications.
- Customer testimonials.

Any missing regulated product information must be clearly marked as demo data requiring supplier verification.

Create a beautiful product label concept, but do not present unverified information as fact.

**PRODUCT IMAGES:** Create a premium product presentation.

**Visual direction:** Minimal white supplement bottle, botanical green label, elegant typography, refined gold details, luxury studio lighting, natural shadows.

Include:
- Front product view.
- Side view.
- Detailed label view.
- Lifestyle product visual.
- 3D interactive bottle.

Prefer original locally generated visual assets or procedurally rendered product visuals. Do not use broken image URLs.

## 6. PRODUCT DETAIL PAGE

Build a premium product detail page at:

`/produits/magnesium-bisglycinate-60-gelules`

**LEFT:**
- Large product gallery.
- Thumbnail navigation.
- Image zoom.
- Interactive 3D product viewer.
- Swipe gestures on mobile.

**RIGHT:**
- Breadcrumb navigation.
- Brand.
- Product name.
- Category.
- Price.
- Availability.
- Product description.
- Quantity selector.
- Add-to-cart button.
- Buy-now button.
- Delivery information.

**PRODUCT INFORMATION SECTIONS:** Create beautiful tabs or accordions:
1. Description
2. Composition
3. Informations nutritionnelles
4. Conseils d'utilisation
5. Précautions
6. Livraison et retours

Show verified information when available. Use clearly labeled temporary demo placeholders for information not yet provided by the supplier. Do not fabricate supplement dosage or safety information.

**EXTRA FEATURES:**
- Related products.
- Recently viewed products.
- Wishlist.
- Sticky add-to-cart on mobile.
- Animated cart confirmation.
- Accessible quantity controls.
- Product availability status.

## 7. COMPLETE PRODUCT CATALOG

Create a functional shop page: `/boutique`.

Build a premium responsive catalog with:
- Product listing.
- Product cards.
- Category filtering.
- Price filtering.
- Sorting.
- Search.
- Pagination or efficient incremental loading.
- Product availability filtering.
- Empty states.
- Loading skeletons.

**CATEGORIES:**
- Vitamines
- Minéraux
- Oméga-3
- Beauté & bien-être
- Sport & nutrition

Seed the featured product as a complete catalog entry. Optionally generate five additional fictional demo products for demonstrating the catalog layout and filtering system.

Any additional demo products must be clearly identifiable as demonstration data. Their product information must not contain unsupported medical or nutritional claims.

## 8. SHOPPING CART

Build a **REAL functional shopping cart** with:
- Add product.
- Remove product.
- Increase quantity.
- Decrease quantity.
- Update subtotal.
- Prevent negative quantities.
- Prevent quantities exceeding available stock.
- Persist cart across refreshes.
- Display cart quantity in navbar.
- Calculate totals from validated server-side data.

**CART UI:** Build a beautiful animated cart drawer with:
- Product image.
- Product name.
- Quantity.
- Unit price.
- Subtotal.
- Remove action.
- Checkout button.

Also create a full cart page: `/panier`.

Use subtle animations when products are added or removed. Provide elegant empty cart states.

## 9. CHECKOUT EXPERIENCE

Create a complete checkout prototype at `/commande`.

**Checkout steps:**
1. Customer information.
2. Delivery address.
3. Delivery method.
4. Payment method.
5. Order confirmation.

**CUSTOMER INFORMATION:** Full name, email, phone number.

**DELIVERY INFORMATION:** Address, city, postal code, additional delivery instructions.

**MARKET:** Morocco.

**PAYMENT METHODS:**
- Cash on delivery (configurable).
- Bank transfer (configurable).
- Mock online payment.

For the first prototype, use a **TEST payment flow**. Do not process actual payments.

Design a payment-provider abstraction that can later connect to an appropriate provider available in Morocco.

**ORDER VALIDATION:**
- Validate customer inputs.
- Revalidate prices.
- Revalidate stock.
- Calculate order totals server-side.
- Prevent invalid or duplicated orders.
- Use database transactions where required.
- Handle order failures gracefully.

**ORDER CONFIRMATION:** Create `/commande/confirmation/[orderId]` with:
- Order reference.
- Ordered products.
- Order total.
- Customer information.
- Delivery address.
- Payment method.
- Order status.

Checkout must be fully functional using the development database.

## 10. CUSTOMER ACCOUNT

Create:
- `/connexion`
- `/inscription`
- `/mon-compte`
- `/mon-compte/commandes`
- `/mon-compte/adresses`

**FEATURES:**
- Secure registration.
- Secure login.
- Logout.
- Profile management.
- Saved addresses.
- Order history.
- Order detail page.
- Password reset architecture.
- Wishlist.

Use secure authentication patterns. Never expose passwords or authentication secrets. Customers must only access their own information.

## 11. ADMIN DASHBOARD

Build a basic but functional administration interface at `/admin`.

Only authorized administrators may access it.

**DASHBOARD:**
- Number of products.
- Number of orders.
- Revenue from valid demo orders.
- Low-stock products.
- Recent orders.

**PRODUCT MANAGEMENT:**
- Create product.
- Edit product.
- Delete/archive product.
- Upload/manage product images.
- Update stock.
- Update pricing.
- Manage categories.

**ORDER MANAGEMENT:**
- List orders.
- View order details.
- Update fulfillment status.
- Filter orders by status.

**CUSTOMER MANAGEMENT:**
- Read-only customer list for the prototype.
- View associated orders.
- Restrict access to personal information.

Keep the admin interface clean and professional. Implement server-side role checks for every privileged operation. Do not rely only on hidden frontend buttons to protect administrator actions.

## 12. DATABASE DESIGN

Use MySQL with Prisma. Design a normalized and maintainable schema.

Include models as appropriate:

```text
User
Account
Session
Address
Product
ProductImage
Category
ProductCategory
ProductVariant
Inventory
Cart
CartItem
Order
OrderItem
Payment
Shipment
Wishlist
WishlistItem
NewsletterSubscriber
```

Add:
- Primary keys.
- Foreign keys.
- Unique constraints.
- Indexes.
- Created/updated timestamps.
- Appropriate enum statuses.

Store money using exact decimal representations or integer minor units. **Never use floating point calculations for financial operations.**

Store order item price snapshots so historical orders remain accurate after catalog price changes.

Implement:
- Prisma migrations.
- Seed scripts.
- Environment configuration.
- Docker Compose MySQL service.

Create the initial featured product in the database. Make it possible to reset and reseed the development environment.

## 13. 3D EXPERIENCE & ANIMATION

The 3D experience is a major differentiator.

Implement a reusable component: `<Product3DViewer />`.

**FEATURES:**
- Smooth 3D product rotation.
- Realistic materials.
- Soft directional lighting.
- Ambient illumination.
- Contact shadows.
- Responsive camera positioning.
- Optional user-controlled rotation.
- Smooth transitions.
- Mobile optimization.

Use React Three Fiber, Drei, and Three.js.

If no 3D model exists, create a procedural supplement bottle using 3D geometries:
- Bottle body.
- Cap.
- Label.
- Logo.
- Material details.

The object should clearly resemble a polished premium supplement bottle. Do not require a paid external 3D asset.

**OPTIMIZE RENDERING PERFORMANCE:**
- Load 3D components lazily.
- Avoid continuous rendering where unnecessary.
- Limit device pixel ratio.
- Avoid expensive effects.
- Pause rendering when offscreen.
- Provide a static fallback.
- Respect reduced-motion preferences.

**ANIMATION PRINCIPLES:** Use motion to improve storytelling, not simply for decoration.

Implement:
1. Page entrance animations.
2. Product card hover transitions.
3. Smooth cart drawer animations.
4. Scroll reveal effects.
5. Product image transitions.
6. Button micro-interactions.
7. Hero product entrance.
8. Tasteful section transitions.

Avoid scroll hijacking and excessive parallax.

## 14. RESPONSIVE DESIGN

Design mobile-first.

Support:
- Small mobile screens.
- Standard smartphones.
- Tablets.
- Laptops.
- Desktop.
- Large monitors.

**MOBILE REQUIREMENTS:**
- Fast loading.
- Touch-friendly buttons.
- Responsive product gallery.
- Sticky add-to-cart bar.
- Elegant mobile navigation.
- Easy checkout.
- Large accessible input fields.
- Smooth scrolling.

The website must look exceptional on mobile, not just desktop.

## 15. SEO IMPLEMENTATION

Implement a complete SEO foundation:
- Server-rendered indexable content.
- Dynamic page titles.
- Meta descriptions.
- Canonical URLs.
- Open Graph metadata.
- Product metadata.
- XML sitemap.
- `robots.txt`.
- Semantic HTML.
- Optimized images.
- Structured data.

Add JSON-LD schemas where appropriate:
- Organization
- BreadcrumbList
- Product
- Offer
- Article

Do not fabricate ratings, reviews, availability, or promotional offers in structured data.

Use localized metadata for French. Set appropriate language attributes and `fr-MA` localization.

**SEO-FRIENDLY ROUTES:**

```text
/
/boutique
/produits/[slug]
/categories/[slug]
/conseils
/conseils/[slug]
/notre-philosophie
/contact
```

Ensure category and product URLs are clean and descriptive.

## 16. PERFORMANCE REQUIREMENTS

Optimize for excellent real-world performance.

**TARGETS:**
- Strong Core Web Vitals.
- LCP <= 2.5 seconds on representative mobile conditions.
- CLS <= 0.1.
- INP <= 200 milliseconds where measurable.
- Smooth animation on capable devices.

Use:
- Server Components where appropriate.
- Lazy loading.
- Image optimization.
- Dynamic imports.
- Font optimization.
- Code splitting.
- Efficient data fetching.
- Caching strategies.
- Optimized database queries.

Do not sacrifice page performance for decorative 3D effects. 3D should progressively enhance the experience. The core shopping experience must remain functional when WebGL is unavailable.

## 17. SECURITY & RELIABILITY

Follow established e-commerce security practices.

Implement:
- Strict input validation.
- Server-side authorization.
- Secure authentication.
- Protection against common injection attacks.
- Safe database access.
- Appropriate CSRF protections.
- Rate limiting for sensitive endpoints.
- Secure session management.
- Environment-based secrets.
- Safe error handling.
- No exposure of internal stack traces.
- Safe image upload restrictions.
- HTTPS-ready configuration.

Never trust client-side product prices, discounts, or totals. Sensitive operations must be verified on the server. Orders must not be creatable with arbitrary user-supplied prices.

## 18. LEGAL & SUPPLEMENT COMPLIANCE

The website sells food supplements. This requires careful product communication.

**IMPORTANT:** Do not describe products as medicines.

Do not claim that supplements:
- Cure diseases.
- Treat medical conditions.
- Prevent diseases.
- Replace medical treatment.

Do not invent clinical evidence.

Do not generate fake:
- Certifications.
- Medical endorsements.
- Laboratory reports.
- Customer reviews.
- Regulatory approvals.

Build configurable sections for:
- Ingredients.
- Nutritional information.
- Recommended usage.
- Precautions.
- Manufacturer information.
- Country of origin.
- Lot and expiry details where applicable.

Use placeholders when information is unknown. Clearly flag all demo product information that must be verified before real sales.

Create draft legal pages:
- Conditions générales de vente.
- Politique de confidentialité.
- Politique de cookies.
- Mentions légales.
- Politique de livraison.
- Politique de retour.

These pages must be clearly marked as requiring local legal review before publication.

Build the necessary structure for applicable Moroccan e-commerce, data protection, consumer protection, and food supplement rules. Do not make definitive claims about legal compliance without verification.

## 19. UX & CONVERSION OPTIMIZATION

The website must be optimized for a frictionless shopping experience.

Implement:
- Visible CTAs.
- Clear pricing.
- Easy product discovery.
- Product search.
- Quick add to cart.
- Persistent cart.
- Minimal checkout friction.
- Guest checkout.
- Clear order summary.
- Helpful validation messages.
- Delivery information.
- Professional empty states.
- Useful error states.
- Clear success feedback.
- Accessible interactions.

Prioritize trust and transparency. Do not use manipulative urgency, fake scarcity, or fabricated reviews.

## 20. PROJECT ARCHITECTURE

Organize code in a clean, scalable structure.

**SUGGESTED ARCHITECTURE:**

```text
src/
  app/
    (store)/
    (auth)/
    admin/
    api/

  components/
    ui/
    layout/
    product/
    cart/
    checkout/
    animations/
    three/

  features/
    products/
    categories/
    cart/
    checkout/
    orders/
    authentication/
    customers/

  lib/
    db/
    auth/
    validations/
    utils/

  server/
    services/
    repositories/

  hooks/
  stores/
  types/
  styles/

prisma/
  schema.prisma
  migrations/
  seed.ts

public/
  images/
  models/

tests/
```

Use this as a guide, not a rigid requirement.

Separate:
- UI components.
- Business logic.
- Data access.
- Validation.
- Authentication.
- Infrastructure.

Avoid placing all logic in page components.

## 21. IMPLEMENTATION STRATEGY

Implement the project in logical phases.

**PHASE 1 — FOUNDATION**
- Initialize/configure Next.js.
- Configure TypeScript.
- Configure Tailwind CSS.
- Install UI dependencies.
- Establish folder architecture.
- Set up design tokens.
- Build reusable components.
- Configure MySQL and Prisma.

**PHASE 2 — BRAND EXPERIENCE**
- Create logo concept.
- Build navigation.
- Build homepage.
- Implement hero.
- Build 3D product bottle.
- Implement animations.
- Build footer.
- Make all pages responsive.

**PHASE 3 — PRODUCT EXPERIENCE**
- Create database models.
- Seed the demonstration product.
- Build catalog.
- Build product details page.
- Implement product gallery.
- Add interactive 3D product viewer.
- Implement filtering/search.

**PHASE 4 — E-COMMERCE**
- Build persistent cart.
- Implement checkout.
- Create order processing logic.
- Implement confirmation page.
- Validate stock and prices.

**PHASE 5 — AUTHENTICATION & ADMIN**
- Customer authentication.
- Customer dashboard.
- Order history.
- Administrator authorization.
- Product management.
- Order management.

**PHASE 6 — QUALITY**
- SEO.
- Accessibility.
- Security review.
- Performance optimization.
- Unit tests.
- E2E tests.
- Responsive QA.
- Final polish.

**IMPORTANT:** Start by delivering a complete working vertical slice:

**Homepage → Product page → Add to cart → Checkout → Persisted order → Confirmation.**

Then expand additional functionality. Do not overbuild secondary features before the primary shopping flow works.

## 22. QUALITY ASSURANCE

Create automated tests covering:
- Product listing.
- Product detail retrieval.
- Cart calculations.
- Cart quantity validation.
- Checkout form validation.
- Order creation.
- Stock handling.
- Authorization checks.
- Search/filter behavior.

Create Playwright E2E tests for:
1. Open homepage.
2. View featured product.
3. Navigate to product details.
4. Add product to cart.
5. Modify quantity.
6. Proceed to checkout.
7. Complete test checkout.
8. Verify confirmation.
9. Verify order exists in database.

Test important mobile interactions.

Before completion, run:
- Type checking.
- Linting.
- Unit tests.
- Production build.
- E2E tests where environment permits.

Fix detected errors. Do not claim tests passed unless executed.

## 23. REQUIRED DELIVERABLES

Deliver:
1. A working Next.js application.
2. A premium homepage.
3. A functioning interactive 3D product.
4. A complete product detail page.
5. A product catalog.
6. A persistent shopping cart.
7. A working development checkout.
8. A functioning MySQL database.
9. Product seed data.
10. Customer authentication.
11. A basic admin dashboard.
12. Responsive mobile design.
13. SEO foundation.
14. Automated tests.
15. Docker development configuration.
16. `.env.example`.
17. Clear README documentation.

**README must contain:**
- Requirements.
- Installation.
- Environment variables.
- How to start MySQL.
- How to migrate the database.
- How to seed products.
- How to run the app.
- How to run tests.
- How to access the demo admin.
- How to deploy.
- Known prototype limitations.

Never commit actual secrets.

## 24. FINAL ACCEPTANCE CRITERIA

The prototype is complete when:
- Homepage loads correctly.
- French content is consistent.
- Design feels like a premium wellness brand.
- 3D product bottle displays correctly.
- 3D gracefully degrades on unsupported devices.
- Product exists in MySQL.
- Product detail page works.
- Add-to-cart works.
- Cart persists.
- Checkout creates an order.
- Order confirmation displays correctly.
- Product stock is updated reliably.
- Admin can manage products.
- Customer data is appropriately protected.
- Mobile layout works.
- No broken links.
- No placeholder navigation to missing pages.
- No obvious TypeScript errors.
- Production build succeeds.
- Core E2E flow is tested.

If a nonessential feature cannot be fully implemented, provide a clearly labeled working fallback rather than a broken or misleading interaction.

## 25. IMPORTANT FINAL INSTRUCTIONS

You are responsible for both **ENGINEERING QUALITY** and **DESIGN QUALITY**.

Do not create a boring generic template.

The first impression should be:

> “This looks like a premium international nutrition brand.”

Pay special attention to:
- Hero design.
- Product bottle visuals.
- Typography.
- Product card composition.
- Whitespace.
- Motion quality.
- Mobile usability.
- Checkout simplicity.

Make thoughtful architectural decisions. Use clean, reusable components. Ensure the visual identity is consistent throughout the entire application.

**All customer-facing text must be in French.**

Use actual database-backed product data, not permanently hardcoded product arrays.

**Start implementing the website now.**

First inspect the repository, then build the foundation, then deliver the functional e-commerce vertical slice, and then complete the remaining features.

Continue through implementation, testing, and refinement rather than stopping after generating a proposal.

The objective is to create a truly impressive and functional first prototype.

---

# Optional follow-up prompt — Visual refinement pass

> Run this **after** the functional prototype is implemented. It is a second, separate instruction for Codex, not a prerequisite to the first run.

Act as an award-winning creative director, senior UI/UX designer, and frontend animation engineer.

Review the entire NŪRIA Nutrition website.

The functional architecture already exists.

Your new mission is to elevate its design to the level of an internationally recognized premium wellness brand.

Focus primarily on:
1. Visual hierarchy.
2. Typography.
3. Composition and spacing.
4. Product presentation.
5. Hero section.
6. 3D bottle realism.
7. Smooth animations.
8. Sophisticated interactions.
9. Responsive design.
10. Premium brand consistency.

**VISUAL DIRECTION:** Minimal luxury. Modern wellness. Botanical elegance. Scientific credibility. Editorial storytelling.

The website should feel custom-designed, not assembled from standard UI templates.

Improve:
- Homepage hero composition.
- Product bottle lighting and materials.
- Heading typography.
- Navigation elegance.
- Product grid spacing.
- Product card interactions.
- Shopping cart animation.
- Product gallery transitions.
- Mobile shopping experience.
- Button design.
- Section transitions.
- Background textures.

Introduce refined visual storytelling, using modern creative frontend techniques.

Use smooth scroll-triggered animations where they improve the experience. Preserve accessibility and performance. Respect reduced-motion preferences.

Do not change working business logic unnecessarily. Do not remove existing features. Do not introduce broken interactions or unnecessary dependencies.

Ensure the result remains responsive, fast, accessible, and production-oriented.

Perform a complete visual polish pass.

The goal is to make the website look like a premium product created by a professional design studio and engineering team.

**Implement the improvements directly.**
