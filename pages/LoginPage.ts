import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/auth/login';

  readonly heading: Locator = this.page.getByRole('heading', { name: 'Login' });
  readonly emailInput: Locator = this.page.getByTestId('email');
  readonly passwordInput: Locator = this.page.getByTestId('password');
  readonly submitButton: Locator = this.page.getByTestId('login-submit');
  readonly errorMessage: Locator = this.page.getByText('Invalid email or password', { exact: true });

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
