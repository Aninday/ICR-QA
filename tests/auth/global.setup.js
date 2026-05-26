const { chromium } = require('@playwright/test');

require('dotenv').config();

const { SignInPage } = require('../../pages/LogIn/signInPage');

async function globalSetup() {

    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    const signInPage = new SignInPage(page);

    const baseUrl = process.env.BASE_URL_DEV || process.env.BASE_URL_LOCAL || 'http://localhost:3000';

    // Navigate to login page
    await signInPage.navigate(`${baseUrl}/login`);

    // Login using env credentials
    await signInPage.login(
        process.env.EMAIL,
        process.env.PASSWORD
    );

    // Wait for successful login
    await page.waitForURL('**/');

    // Save authenticated session
    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });

    await browser.close();
}

module.exports = globalSetup;