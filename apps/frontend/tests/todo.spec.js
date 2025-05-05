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
test("測試完成待辦事項", async ({ page }) => {
  // 前往 Todo App
  await page.goto("http://localhost:3000");

  // 填寫新待辦事項
  await page.fill('input[name="title"]', "SADo 測試");
  await page.fill('textarea[name="description"]', "填寫一個新的 SADo E2E 測試");
  await page.click('button[type="submit"]');

  // 確認新增的待辦事項是否正確
  const todoItem = await page.waitForSelector(".todo-item");
  expect(todoItem).not.toBeNull();
  expect(await todoItem.innerText()).toContain("SADo 測試");
  expect(await todoItem.innerText()).toContain("填寫一個新的 SADo E2E 測試");

  // 把新待辦事項標示為已完成
  // ✅ 模擬點擊「完成」按鈕或 checkbox
  const completeButton = await todoItem.$('input[type="checkbox"]'); // 或改成 'button.complete-btn' 根據你的 UI
  expect(completeButton).not.toBeNull();
  await completeButton?.check(); // 對 checkbox：用 check()；對按鈕：用 click()

  // ✅ 驗證待辦事項已被標記為完成
  // 假設完成後 todo-item 會加上 .completed class
  await expect(todoItem).toHaveClass(/completed/);
  
});
