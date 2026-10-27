import { expect, test } from '../../../fixtures/test';
import { buildUnregisteredCredentials } from '../../../test-data/users';

test.describe('Login', () => {
  test('rejeita credenciais não cadastradas', async ({ loginPage }) => {
    const { email, password } = buildUnregisteredCredentials();

    await loginPage.goto();
    await loginPage.login(email, password);

    await loginPage.expectToBeOpen();
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
