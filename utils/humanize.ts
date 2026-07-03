import { type Locator, type Page } from "@playwright/test";

export async function humanPause(minMs = 250, maxMs = 900) {
  const delay = minMs + Math.floor(Math.random() * (maxMs - minMs));
  await new Promise((resolve) => setTimeout(resolve, delay));
}

export async function moveMouseNaturally(page: Page) {
  const viewport = page.viewportSize();
  if (!viewport) {
    return;
  }

  const points = 3 + Math.floor(Math.random() * 3);
  for (let index = 0; index < points; index += 1) {
    const x = Math.floor(80 + Math.random() * Math.max(viewport.width - 160, 1));
    const y = Math.floor(80 + Math.random() * Math.max(viewport.height - 160, 1));

    await page.mouse.move(x, y, { steps: 8 + Math.floor(Math.random() * 8) });
    await humanPause(80, 240);
  }
}

export async function fillLikeHuman(locator: Locator, text: string) {
  await locator.click();
  await locator.fill("");

  for (const character of text) {
    await locator.pressSequentially(character, {
      delay: 45 + Math.floor(Math.random() * 75),
    });
  }
}
