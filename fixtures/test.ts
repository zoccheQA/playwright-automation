import { test as base, expect } from '@playwright/test';
import { AccountPage } from '../pages/AccountPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

type PageFixtures = {
  accountPage: AccountPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

/**
 * `test` customizado: entrega os Page Objects prontos para uso nos specs.
 * Novas páginas (e, no futuro, clientes de API ou de IA) entram aqui.
 */
export const test = base.extend<PageFixtures>({
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

export { expect };
