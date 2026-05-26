class CreateProjectPage {
    constructor(page) {
        this.page = page;

        this.organizationSwitcher = page.getByText('aninday.mondal+automation@');

        this.organizationOption = page.getByRole('dialog').getByText('test_automation');

        this.createProjectButton = page.getByRole('button', { name: 'Create Project' });

        this.registryDropdown = page.getByRole('combobox');

        this.registryOption = page.getByRole('option', { name: 'ICR' });

        this.startDateCalendarButton = page.getByRole('button').filter({ hasText: /^$/ });

        this.startDate = page.getByRole('gridcell', { name: '19' });

        this.projectNameInput = page.getByRole('textbox', { name: 'A Verified Scientific Climate' });

        this.projectIdInput = page.getByRole('textbox', { name: 'Climate Project X' });

        this.continueButton = page.getByRole('button', { name: 'Continue' });

        this.createProjectDraftButton = page.getByRole('button', { name: 'Create a Project Draft' });
    }

    async navigate() {
        await this.page.goto('/');
    }

    async selectOrganization() {
        await this.organizationSwitcher.click();
        await this.organizationOption.click();
    }

    async clickCreateProject() {
        await this.createProjectButton.click();
    }

    async selectRegistry() {
        await this.registryDropdown.click();
        await this.registryOption.click();
    }

    async selectStartDate() {
        await this.startDateCalendarButton.click();
        await this.startDate.click();
    }

    async enterProjectName(projectName) {
        await this.projectNameInput.fill(projectName);
    }

    async enterProjectId(projectId) {
        await this.projectIdInput.fill(projectId);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickCreateProjectDraft() {
        await this.createProjectDraftButton.click();
    }

    async createProject(projectName, projectId) {
        await this.selectOrganization();
        await this.clickCreateProject();
        await this.selectRegistry();
        await this.selectStartDate();
        await this.enterProjectName(projectName);
        await this.enterProjectId(projectId);
        await this.clickContinue();
        await this.clickCreateProjectDraft();
    }
}

module.exports = { CreateProjectPage };