const { test, expect } = require('@playwright/test');

const { CreateOrganizationPage } = require('../../../pages/Organization/createOrganizationPage');

const { OrganizationData } = require('../../data/OrganizationData');

const { saveData } = require('../../helper/apiHelper');

test.describe('Create Organization Tests', { tag: ['@organization', '@UI'] }, () => {

    let createOrganizationPage;
    let page;

    test.beforeEach(async ({ page }) => {
        createOrganizationPage = new CreateOrganizationPage(page);
        await createOrganizationPage.navigate();
    });

    test('Should display create organization page elements correctly', async ({ page }) => {

        await expect.soft(createOrganizationPage.createOrganizationButton).toBeVisible();

        await createOrganizationPage.clickCreateOrganization();
        await page.waitForTimeout(1000);

        await expect.soft(createOrganizationPage.createOrganizationForm).toBeVisible();

    });

    test('Should create organization successfully', { tag: '@SMOKE' }, async ({ page }) => {

        const logoPath = 'tests/assets/automation.png';

        await createOrganizationPage.clickCreateOrganization();

        await createOrganizationPage.createOrganization(
            OrganizationData.validOrganization.orgName,
            OrganizationData.validOrganization.orgWebsite,
            logoPath
        );

        await saveData({ orgName: OrganizationData.validOrganization.orgName }, 'UI');

        await expect(page).toHaveURL(/\/organizations\/.*/);

    });



});