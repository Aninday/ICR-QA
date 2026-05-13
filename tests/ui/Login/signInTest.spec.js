const { test, expect, chromium } = require('@playwright/test');
const { SignInPage } = require('../../../pages/LogIn/signInPage');

test.describe('Login Page UI Tests', { tag: ['@loginUi', '@UI'] }, () => {

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

    await signInPage.login(process.env.EMAIL, process.env.PASSWORD);

    const errorMessage = await signInPage.getErrorMessage();

    expect(errorMessage).toContain('Unable to log in');
    expect(page.url()).toBe(`${baseURL}/login`);

  });

  test('Login with Invalid Username Credential', async ({ page, baseURL }) => {

    await signInPage.login(process.env.INVALIDEMAIL, process.env.INVALIDPASSWORD);

    const errorMessage = await signInPage.getErrorMessage();

    expect(errorMessage).toContain('Unable to log in');
    expect(page.url()).toBe(`${baseURL}/login`);
  });

  test.only('Should Successfully Login with valid Credentials', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 300,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  const signInPage = new SignInPage(page);

  await page.goto(process.env.BASE_URL_DEV);

  await signInPage.login(
    process.env.EMAIL, 
    process.env.PASSWORD
  );

  // Wait manually for captcha solving if needed
  await page.pause();

  await page.waitForURL('**/');

  // Save authenticated session
  await context.storageState({
    path: 'playwright/.auth/user.json'
  });

  await browser.close();
});

});