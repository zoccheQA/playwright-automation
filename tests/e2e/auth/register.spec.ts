import { expect, test } from '../../../fixtures/test';
import { buildUser } from '../../../test-data/users';

test.describe('Cadastro', () => {
  test('cria conta com dados válidos e permite login', async ({ registerPage, loginPage, accountPage }) => {
    const user = buildUser();

    await registerPage.goto();
    await registerPage.register(user);

    // O app redireciona para o login sem aviso visível de sucesso; autenticar confirma que a conta foi criada.
    await loginPage.expectToBeOpen();
    await loginPage.login(user.email, user.password);

    await accountPage.expectToBeOpen();
    await expect(accountPage.heading).toBeVisible();
    await expect(accountPage.userMenu(`${user.firstName} ${user.lastName}`)).toBeVisible();
  });
});
