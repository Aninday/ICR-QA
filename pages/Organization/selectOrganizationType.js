class SelectOrganizationType {
    constructor(page) {
        this.page = page;

        this.organizationName = page.locator('div').locator('div').nth(0);

        this.onboardingHeading = page.getByText('What best describes you?');

        this.projectProponentOption = page.getByText('Project Proponent');
        this.projectdeveloperOption = page.getByText('Project Developer');
        this.marketplaceOption = page.getByText('Marketplace');

        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async clickProjectProponent() {
        await this.projectProponentOption.click();
    }
    async clickProjectDeveloper() {
        await this.projectDeveloperOption.click();
    }
    async clickMarketplace() {
        await this.marketplaceOption.click();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async onboardingAsProjectProponent(orgName) {
        await this.clickProjectProponent();
        await this.clickContinueButton();
    }
    async onboardingAsProjectDeveloper(orgName) {
        await this.clickProjectDeveloper();
        await this.clickContinueButton();
    }   
    async onboardingAsMarketplace(orgName) {
        await this.clickMarketplace();
        await this.clickContinueButton();
    }
}

module.exports = { SelectOrganizationType };