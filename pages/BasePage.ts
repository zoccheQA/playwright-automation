import { expect, type Page } from '@playwright/test';

/**
 * Base para todos os Page Objects.
 * Mantém apenas o que é realmente comum: navegação e verificação de URL.
 * Interações e asserções ficam nos locators de cada página (auto-wait do Playwright).
 */
export abstract class BasePage {
  /** Caminho relativo ao baseURL, ex.: '/auth/login'. */
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  async expectToBeOpen(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${escapeRegExp(this.path)}$`));
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
