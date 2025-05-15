import { BasePage } from '../basePoms';
import { SignInModal } from '../modals';
import { expect } from '@playwright/test';

export default class SettingsPage extends BasePage {
  constructor(page) {
    super(page, '');
  }

  selectors = {
    signInButton: this.page.getByRole('button', { name: 'Sign In' })
  };

  async clickSignInButton(){
    await expect(this.selectors.signInButton).toBeVisible();
    await this.selectors.signInButton.click();
    return new SignInModal(this.page);
  }
}