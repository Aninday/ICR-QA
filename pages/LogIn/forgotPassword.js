class ForgotPasswordPage {
    constructor(page) {
        this.page = page;

        this.forgotForm = page.locator('form:visible');
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.submitButton = page.getByRole('button', { name: 'Send reset password instructions' });
        this.backToSignInLink = page.getByRole('link', { name: /Sign in|Back to sign in/i });
        this.pageHeading = page.getByText(/Forgot password|Reset your password/i);
        this.confirmationMessage = page.getByText('If an account exists with this email');
    }

    async navigate() {
        await this.page.goto('/login?type=forgot');
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async submit() {    
        await this.submitButton.click();
    }

    async requestPasswordReset(email) {
        await this.fillEmail(email);
        await this.submit();
    }

    async getConfirmationText() {
        return await this.confirmationMessage.textContent();
    }
}

module.exports = { ForgotPasswordPage };