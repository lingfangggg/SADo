// TODO: Playwright 測試範例

import { test, expect } from "@playwright/test";

test("測試新增待辦事項", async ({ page }) => {
  // 前往 Todo App
  await page.goto("http://localhost:3000");

  // 填寫新待辦事項
  await page.fill('input[name="title"]', "學習 Playwright");
  await page.fill('textarea[name="description"]', "學習 Playwright 的使用方法");
  await page.click('button[type="submit"]');

  // 確認新增的待辦事項是否正確
  const todoItem = await page.waitForSelector(".todo-item");
  expect(todoItem).not.toBeNull();
  expect(await todoItem.innerText()).toContain("學習 Playwright");
  expect(await todoItem.innerText()).toContain("學習 Playwright 的使用方法");
});

// new test statement
test("測試新增待辦事項 2", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.fill('input[name="title"]', "SADo 測試");
  await page.fill('textarea[name="description"]', "填寫一個新的 SADo E2E 測試");
  await page.click('button[type="submit"]');

  const todoItems = page.locator(".todo-item");
  await expect(todoItems).toHaveCountGreaterThan(0);

  const lastItem = todoItems.last();
  await expect(lastItem).toContainText("SADo 測試");
  await expect(lastItem).toContainText("填寫一個新的 SADo E2E 測試");
});

