import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  protected readonly path = '/account';

  readonly heading: Locator = this.page.getByRole('heading', { name: 'My account' });

  /** Menu do usuário logado, identificado pelo nome completo. */
  userMenu(fullName: string): Locator {
    return this.page.getByRole('menuitem', { name: fullName });
  }
}
