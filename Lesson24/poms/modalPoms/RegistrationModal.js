import { expect } from '@playwright/test';
import { BasePage } from '../basePoms';

export default class RegistrationModal extends BasePage {
  selectors = {
    openButton: this.page.locator('button:has-text("Sign up")'),
    nameInput: this.page.locator('#signupName'),
    lastNameInput: this.page.locator('#signupLastName'),
    emailInput: this.page.locator('#signupEmail'),
    passwordInput: this.page.locator('#signupPassword'),
    repeatPasswordInput: this.page.locator('#signupRepeatPassword'),
    registerButton: this.page.locator('button:has-text("Register")'),

    getFieldError: (selector, text) =>
      this.page.locator(selector).locator('..').locator(`text=${text}`),
  };

  async openModal() {
    await this.selectors.openButton.click();
  }

  async fillName(name) {
    await this.selectors.nameInput.fill(name);
  }

  async fillLastName(lastName) {
    await this.selectors.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.selectors.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.selectors.passwordInput.fill(password);
  }

  async fillRepeatPassword(password) {
    await this.selectors.repeatPasswordInput.fill(password);
  }

  async submit() {
    await this.selectors.registerButton.click();
  }

  async blurField(locator) {
    await locator.focus();
    await locator.evaluate(el => el.blur());
  }

  async blurAllFields() {
    await this.blurField(this.selectors.nameInput);
    await this.blurField(this.selectors.lastNameInput);
    await this.blurField(this.selectors.emailInput);
    await this.blurField(this.selectors.passwordInput);
    await this.blurField(this.selectors.repeatPasswordInput);
  }

  async getErrorForField(selector, expectedText) {
    return this.selectors.getFieldError(selector, expectedText);
  }

  async expectFieldToHaveErrorBorder(selector) {
    await expect(this.page.locator(selector)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }

  async expectFieldToHaveError(selector, expectedText) {
    const error = await this.getErrorForField(selector, expectedText);
    await expect(error).toBeVisible();
    await this.expectFieldToHaveErrorBorder(selector);
  }

  async isRegisterButtonEnabled() {
    return await this.selectors.registerButton.isEnabled();
  }

  async fillForm({ name, lastName, email, password, repeatPassword }) {
    await this.fillName(name);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillRepeatPassword(repeatPassword);
  }
}
