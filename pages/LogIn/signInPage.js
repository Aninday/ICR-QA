    
class SignInPage {
    constructor(page) {
        this.page = page;
        
        this.loginForm = page.locator('form:visible');
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' })
        this.signUpButton = page.getByRole('button', { name: /Don't have an account\? Sign up/i })
        this.pageHeading = page.locator(':text("Login")');
        this.icrLogoImage = page.locator("svg[width='146']");
        
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.loginButton.click();
    }

    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    async clickCreateAccount() {
        await this.signUpButton.click();
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.submit();
    }
    
}

module.exports = { SignInPage };