const { test, expect, chromium } = require('@playwright/test');
const { SignInPage } = require('../../../pages/LogIn/signInPage');

test.describe('Sign In Page Tests', { tag: ['@loginUi', '@UI'] }, () => {
  
  test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

  let signInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    await signInPage.navigate();
  });

  test('should display login page elements correctly', async ({ page, baseURL }) => {

    await expect.soft(signInPage.loginForm).toBeVisible();
    await expect.soft(signInPage.pageHeading).toHaveText('Login');
    await expect.soft(signInPage.icrLogoImage).toBeVisible();
    await expect.soft(signInPage.emailInput).toBeVisible();
    await expect.soft(signInPage.passwordInput).toBeVisible();
    await expect.soft(signInPage.loginButton).toBeVisible();
    await expect.soft(signInPage.forgotPasswordLink).toBeVisible();
    await expect.soft(signInPage.signUpButton).toBeVisible();
    await expect.soft(signInPage.loginButton).toBeEnabled();
    await expect.soft(signInPage.forgotPasswordLink).toBeEnabled();

    expect.soft(page.url()).toBe(`${baseURL}/login`);

  });

  test('Login with Invalid Password Credential', async ({ page, baseURL }) => {

    await signInPage.login(process.env.EMAIL, process.env.INVALIDPASSWORD);

    const errorMessage = await signInPage.getErrorMessage();

    expect(errorMessage).toContain('Invalid email or password');
    expect(page.url()).toBe(`${baseURL}/login`);

  });

  test('Login with Invalid Username Credential', async ({ page, baseURL }) => {

    await signInPage.login(process.env.INVALIDEMAIL, process.env.INVALIDPASSWORD);

    const errorMessage = await signInPage.getErrorMessage();

    expect(errorMessage).toContain('Invalid email or password');
    expect(page.url()).toBe(`${baseURL}/login`);
  });

  test.only('Should Successfully Login with valid Credentials', async ({ page, context, baseURL }) => {

    // navigate to base URL and perform login using page from fixture
    await page.goto(process.env.BASE_URL_DEV || baseURL);

    await signInPage.login(
      process.env.EMAIL,
      process.env.PASSWORD
    );

    await expect(page).toHaveURL(`${baseURL}/`);

    // Save authenticated session
    await context.storageState({
      path: 'playwright/.auth/user.json'
    });

});

});