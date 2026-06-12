import { test, expect } from "@playwright/test";

test.describe("Kanban board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with dummy data", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Project Board" })).toBeVisible();
    await expect(page.getByTestId("column-col-1")).toBeVisible();
    await expect(page.getByTestId("column-col-5")).toBeVisible();
    await expect(page.getByText("Design system audit")).toBeVisible();
    await expect(page.getByText("Dummy data setup")).toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    const column = page.getByTestId("column-col-1");
    await column.getByTestId("column-title").click();
    const input = column.getByTestId("column-rename-input");
    await input.fill("Ideas");
    await input.press("Enter");

    await expect(column.getByTestId("column-title")).toHaveText("Ideas");
  });

  test("adds a card to a column", async ({ page }) => {
    const column = page.getByTestId("column-col-3");
    await column.getByTestId("add-card-trigger").click();
    await column.getByTestId("add-card-title").fill("E2E test card");
    await column.getByTestId("add-card-details").fill("Created by Playwright");
    await column.getByTestId("add-card-submit").click();

    await expect(column.getByText("E2E test card")).toBeVisible();
    await expect(column.getByText("Created by Playwright")).toBeVisible();
  });

  test("deletes a card", async ({ page }) => {
    const card = page.getByTestId("card-card-1");
    await expect(card).toBeVisible();
    await card.getByTestId("delete-card").click({ force: true });
    await expect(page.getByTestId("card-card-1")).not.toBeVisible();
  });

  test("drags a card to another column", async ({ page }) => {
    await expect(page.getByTestId("board")).toBeVisible();

    const card = page.getByTestId("card-card-2");
    const targetColumn = page.getByTestId("column-drop-col-5");

    const cardBox = await card.boundingBox();
    const targetBox = await targetColumn.boundingBox();
    if (!cardBox || !targetBox) throw new Error("Could not get bounding boxes");

    const startX = cardBox.x + cardBox.width / 2;
    const startY = cardBox.y + cardBox.height / 2;
    const endX = targetBox.x + targetBox.width / 2;
    const endY = targetBox.y + targetBox.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 20, startY, { steps: 5 });
    await page.mouse.move(endX, endY, { steps: 15 });
    await page.mouse.up();

    await expect(
      page.getByTestId("column-col-5").getByText("User research synthesis")
    ).toBeVisible();
    await expect(
      page.getByTestId("column-col-1").getByText("User research synthesis")
    ).not.toBeVisible();
  });
});
