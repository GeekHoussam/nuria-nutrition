import { expect, test } from "@playwright/test";

test("parcours vitrine vers confirmation de commande", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Votre bien-être/ })).toBeVisible();
  const cookieChoice = page.getByRole("button", { name: "Essentiels uniquement" });
  await cookieChoice.click();
  await expect(cookieChoice).toBeHidden();
  await page.getByRole("link", { name: "Voir le produit" }).click();
  await expect(page).toHaveURL(/\/produits\/magnesium-bisglycinate-60-gelules/);
  await expect(page.getByRole("heading", { level: 1, name: "Magnésium Bisglycinate" })).toBeVisible();
  const addButton = page.viewportSize()!.width < 768
    ? page.getByRole("button", { name: "Ajouter", exact: true })
    : page.getByRole("button", { name: "Ajouter au panier" });
  await addButton.click();
  await expect(page.getByRole("dialog", { name: "Votre panier" })).toBeVisible();
  await page.getByRole("link", { name: "Passer la commande" }).click();
  await page.getByLabel("Nom complet").fill("Nadia Test");
  await page.getByLabel("E-mail").fill("nadia.e2e@example.com");
  await page.getByLabel("Téléphone").fill("+212 600 000 000");
  await page.getByLabel("Adresse", { exact: true }).fill("10 avenue du Test");
  await page.getByLabel("Ville").fill("Rabat");
  await page.getByRole("button", { name: "Confirmer la commande test" }).click();
  await expect(page.getByRole("heading", { name: /Merci, Nadia/ })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/Votre commande test NUR-/)).toBeVisible();
});
