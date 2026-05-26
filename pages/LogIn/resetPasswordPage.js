class ResetPasswordPage {
    constructor(page) {
        this.page = page;

        this.pageHeading = page.locator('text=/Reset Your Password|Input new password|Reset Password/i');
        this.resetPasswordButton = page.getByRole('button', { name: /Reset Password/i });
        this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
        this.confirmPasswordInput = page.getByRole('textbox', { name: /Confirm password/i });
        this.updatePasswordButton = page.getByRole('button', { name: /Update password|Submit|Save password/i });
    }

    async clickResetPasswordButtonIfVisible() {
        if (await this.resetPasswordButton.count() && await this.resetPasswordButton.isVisible()) {
            await this.resetPasswordButton.click();
        }
    }

    async fillNewPassword(password) {
        await this.passwordInput.fill(password);
    }

    async fillConfirmPassword(password) {
        await this.confirmPasswordInput.fill(password);
    }

    async submitUpdatePassword() {
        await this.updatePasswordButton.click();
    }

    async completeResetPassword(newPassword) {
        await this.clickResetPasswordButtonIfVisible();
        await this.page.waitForLoadState('networkidle');
        await this.fillNewPassword(newPassword);
        await this.fillConfirmPassword(newPassword);
        await this.submitUpdatePassword();
    }
}

module.exports = { ResetPasswordPage };