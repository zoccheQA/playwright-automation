import type { Locator } from '@playwright/test';
import type { RegistrationDetails } from '../test-data/users';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  protected readonly path = '/auth/register';

  readonly firstName: Locator = this.page.getByTestId('first-name');
  readonly lastName: Locator = this.page.getByTestId('last-name');
  readonly dateOfBirth: Locator = this.page.getByTestId('dob');
  readonly country: Locator = this.page.getByTestId('country');
  readonly postalCode: Locator = this.page.getByTestId('postal_code');
  readonly houseNumber: Locator = this.page.getByTestId('house_number');
  readonly street: Locator = this.page.getByTestId('street');
  readonly city: Locator = this.page.getByTestId('city');
  readonly state: Locator = this.page.getByTestId('state');
  readonly phone: Locator = this.page.getByTestId('phone');
  readonly email: Locator = this.page.getByTestId('email');
  readonly password: Locator = this.page.getByTestId('password');
  readonly submitButton: Locator = this.page.getByTestId('register-submit');

  async fillForm(details: RegistrationDetails): Promise<void> {
    await this.firstName.fill(details.firstName);
    await this.lastName.fill(details.lastName);
    await this.dateOfBirth.fill(details.dateOfBirth);
    await this.country.selectOption(details.country);
    await this.postalCode.fill(details.postalCode);
    await this.houseNumber.fill(details.houseNumber);
    await this.street.fill(details.street);
    await this.city.fill(details.city);
    await this.state.fill(details.state);
    await this.phone.fill(details.phone);
    await this.email.fill(details.email);
    await this.password.fill(details.password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /** Preenche e envia o formulário de cadastro. */
  async register(details: RegistrationDetails): Promise<void> {
    await this.fillForm(details);
    await this.submit();
  }
}
