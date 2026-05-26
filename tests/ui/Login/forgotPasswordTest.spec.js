const { test, expect } = require('@playwright/test');
const { SignInPage } = require('../../../pages/LogIn/signInPage');
const { ForgotPasswordPage } = require('../../../pages/LogIn/forgotPassword');
const { ResetPasswordPage } = require('../../../pages/LogIn/resetPasswordPage');
const { getResetPasswordLink } = require('../../helper/signUpHelper');

const NEW_PASSWORD = process.env.NEW_PASSWORD || 'Test@12345';

test.describe('Forgot Password End-to-End Flow', { tag: ['@forgotPasswordUi', '@UI'] }, () => {

    test.use({
        storageState: {
            cookies: [],
            origins: []
        }
    });

    let signInPage;
    let forgotPasswordPage;
    let resetPasswordPage;

    test.beforeEach(async ({ page }) => {
        signInPage = new SignInPage(page);
        forgotPasswordPage = new ForgotPasswordPage(page);
        resetPasswordPage = new ResetPasswordPage(page);
        await signInPage.navigate();
        await signInPage.clickForgotPassword();
    });

    test('should request password reset and login with updated password', async ({ page, baseURL }) => {
        const email = process.env.EMAIL;
        if (!email) {
            throw new Error('Please set process.env.EMAIL for the forgot password flow.');
        }

        await forgotPasswordPage.requestPasswordReset(email);
        await expect.soft(forgotPasswordPage.confirmationMessage).toBeVisible();
        await expect.soft(forgotPasswordPage.confirmationMessage).toContainText(/receive a password reset link/i);

        const resetLink = await getResetPasswordLink(email);
        await page.goto(resetLink, { waitUntil: 'networkidle' });

        await resetPasswordPage.completeResetPassword(NEW_PASSWORD);
        await expect(page).toHaveURL(/\/login/);

        await signInPage.navigate();
        await signInPage.login(email, NEW_PASSWORD);
        await expect(page).toHaveURL(`${baseURL}/`);
    });
});
