class CreateOrganizationPage {
    constructor(page) {
        this.page = page;

        this.createOrganizationButton = page.getByRole('button', { name: 'Create Organization' });

        this.createOrganizationForm = page.locator('form:visible');

        this.organizationNameInput = page.getByRole('textbox', { name: 'Company Inc.' });

        this.websiteInput = page.getByRole('textbox', { name: 'www.website.com' });

        this.createOrganizationButton = page.getByRole('button', { name: 'Create organization' });

        this.organizationLogoInput = page.locator('input[type="file"]')

        this.uploadOriginalImage = page.getByRole('button', { name: 'Upload Original Image' })

        this.termsAcceptButton = page.getByRole('checkbox', { name: 'Please accept the Organization Terms v6.0' });
    }

    async navigate() {
        await this.page.goto('/');
    }

    async clickCreateOrganization() {
        await this.createOrganizationButton.click();
    }

    async enterOrganizationName(orgName) {
        await this.organizationNameInput.fill(orgName);
    }

    async enterWebsite(orgWebsite) {
        await this.websiteInput.fill(orgWebsite);
    }

    async uploadOrganizationLogo(filePath) {
        await this.organizationLogoInput.setInputFiles(filePath);
    }

    async clickUploadOriginalImage(){
        await this.uploadOriginalImage.click();
    }

    async clickTurnAcceptButton(){
        await this.termsAcceptButton.check();
    }

    async submit() {
        await this.createOrganizationButton.click();
    }

    async createOrganization(orgName, orgWebsite, filePath) {
        await this.enterOrganizationName(orgName);
        await this.enterWebsite(orgWebsite);
        await this.uploadOrganizationLogo(filePath);
        await this.clickUploadOriginalImage();
        await this.clickTurnAcceptButton();
        await this.submit();
    }
}

module.exports = { CreateOrganizationPage };