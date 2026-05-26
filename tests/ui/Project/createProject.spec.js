const { test, expect } = require('@playwright/test');
const { CreateProjectPage } = require('../../../pages/Project/createProject');


// Use saved authenticated session
test.use({
    storageState: 'playwright/.auth/user.json'
});

test.describe('Create Project Tests', { tag: ['@project', '@UI'] }, () => {

    let createProjectPage;

    test.beforeEach(async ({ page }) => {
        createProjectPage = new CreateProjectPage(page);
        await createProjectPage.navigate();
    });

    test('Should create project successfully', { tag: '@SMOKE' }, async ({ page }) => {

        const projectName = `Test_automation_project_${Date.now()}`;

        const projectId = 'test';

        await createProjectPage.createProject(
            projectName,
            projectId
        );

        await expect(page).toHaveURL(/\/projects\/.*/);

    });

});