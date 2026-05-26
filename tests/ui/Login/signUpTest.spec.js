const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../../../pages/LogIn/signUpPage');
const { generateTestEmail, getGmailMessages } = require('../../helper/signUpHelper');
const { ValidTestData } = require('../../data/SignUpdata');
const { saveData } = require('../../helper/apiHelper');

test.describe('Sign Up Page UI Tests', { tag: ['@signUpUi', '@UI'] }, () => {

    test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

    let signUpPage;
    let newEmail;
    let page;

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
        await signUpPage.navigate();
    });

    test('should display sign up page elements correctly', async ({ page, baseURL }) => {

        await expect.soft(signUpPage.signUpForm).toBeVisible();
        await expect.soft(signUpPage.pageHeading).toHaveText('Create an account');
        await expect.soft(signUpPage.icrLogoImage).toBeVisible();
        await expect.soft(signUpPage.emailInput).toBeVisible();
        await expect.soft(signUpPage.passwordInput).toBeVisible();
        await expect.soft(signUpPage.confirmPasswordInput).toBeVisible();
        await expect.soft(signUpPage.signUpButton).toBeVisible();
        await expect.soft(signUpPage.signInLink).toBeVisible();
        await expect.soft(signUpPage.signUpButton).toBeEnabled();
        await expect.soft(signUpPage.signInLink).toBeEnabled();

        expect.soft(page.url()).toBe(`${baseURL}/login?type=signup`);

    });
    
    test('Create an Account with a Non existing user', { tag: '@SMOKE' }, async ({ page }) => {
        newEmail = generateTestEmail();
        await saveData({ newEmail: newEmail }, 'UI');

        const signUpPage = new SignUpPage(page);

        // Navigate to the sign-up page and fill in the required fields
        await signUpPage.signUp(newEmail, ValidTestData.Password);
        await expect(page).toHaveURL(/\/verify-email\?.*type=confirm_email/);
        await expect(signUpPage.otpInput).toBeVisible();
        const { receivedVerificationCode } = await getGmailMessages(newEmail);
        await signUpPage.inputOtp(receivedVerificationCode);
        await page.waitForTimeout(5000);
        await expect(page).toHaveURL(`/`);
        await expect(page.getByText(`${newEmail}`)).toBeVisible();
    });
});