import { expect } from '@playwright/test';
import { BaseModal } from '../basePoms';
export default class SignInModal extends BaseModal {
  selectors = {
    emailInput: this.page.getByRole('textbox', { name: 'Email' }),
    passwordInput: this.page.getByRole('textbox', { name: 'Password' }),
    loginButton: this.page.getByRole('button', { name: 'Login' })
  };

  async executeLogin(email = 'aqa-dinwinchester06@gmail.com', password = 'Password1'){
    await this.selectors.emailInput.click();
    await this.selectors.emailInput.fill(email);
    await this.selectors.passwordInput.click();
    await this.selectors.passwordInput.fill(password);
    await this.selectors.loginButton.click();
    await expect(this.page).toHaveURL(/\/panel\/garage/);
  }
}