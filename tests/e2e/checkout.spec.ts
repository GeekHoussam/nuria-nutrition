import { expect, test } from "@playwright/test";

test("parcours vitrine vers la démo de commande statique", async ({ page }) => {
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
  await page.getByRole("link", { name: "Voir la démo de commande" }).click();
  await expect(page.getByRole("heading", { name: "Commande désactivée." })).toBeVisible();
  await expect(page.getByText(/aucune commande, donnée personnelle ou transaction/i)).toBeVisible();
});
