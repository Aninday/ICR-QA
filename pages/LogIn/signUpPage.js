class SignUpPage {
    constructor(page) {
        this.page = page;

        this.signUpForm = page.locator('form:visible');
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm password' });
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.signInLink = page.getByRole('link', { name: /Already have an account\? Sign in/i });
        this.pageHeading = page.getByText('Create an account');
        this.icrLogoImage = page.locator("svg[width='146']");
        this.otpInput = page.locator('input');
    }

    async navigate() {
        await this.page.goto('/login?type=signup');
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async enterConfirmPassword(password) {
        await this.confirmPasswordInput.fill(password);
    }

    async submit() {
        await this.signUpButton.click();
    }

    async clickSignIn() {
        await this.signInLink.click();
    }
    async inputOtp(otp) {
        await this.otpInput.fill(otp);
    }

    async signUp(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterConfirmPassword(password);
        await this.submit();
    }
}

module.exports = { SignUpPage };