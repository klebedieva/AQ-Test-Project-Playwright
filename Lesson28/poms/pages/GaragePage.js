import { BasePage } from '../basePoms';
import { expect } from '@playwright/test';

export default class GaragePage extends BasePage {
  constructor(page) {
    super(page, '/panel/garage');
    this.page = page;
  }

  // Elements
  get addCarButton() {
    return this.page.getByRole('button', { name: 'Add car' });
  }

  get carBrandSelect() {
    return this.page.locator('#addCarBrand');
  }

  get carModelSelect() {
    return this.page.locator('select[formcontrolname="model"]');
  }

  get mileageInput() {
    return this.page.locator('input[name="mileage"]');
  }

  get submitButton() {
    return this.page.locator('app-add-car-modal button.btn.btn-primary');
  }

  get errorMessageInvalidMileage() {
    return this.page.getByText('Mileage has to be from 0 to 999999');
  }

  get errorMessageEmptyMileage() {
    return this.page.getByText('Mileage cost required');
  }

  get closeButton() {
    return this.page.locator('button.close');
  }

  get cancelButton() {
    return this.page.locator('button.btn.btn-secondary', { hasText: 'Cancel' });
  }

  getAddExpenseButton(carName) {
    return this.page.locator('.car-item').filter({ hasText: carName }).getByRole('button', { name: 'Add fuel expense' });
  }

  // Actions
  async openAddCarModal() {
    await this.addCarButton.click();
  }

  async selectCarBrand(brand) {
    await this.carBrandSelect.selectOption({ label: brand });
  }

  async selectCarModel(model) {
    await this.carModelSelect.selectOption({ label: model });
  }

  async clickMileage() {
    await this.mileageInput.focus();
    await this.mileageInput.blur();
  }

  async enterMileage(mileage) {
    await this.mileageInput.fill(mileage);
  }

  async submitAddCarForm() {
    await this.submitButton.click();
  }

  async closeModal() {
    await this.closeButton.click();
  }

  async cancelAddCar() {
    await this.cancelButton.click();
  }

  async checkSubmitButtonDisabled() {
    await expect(this.submitButton).toBeDisabled();
  }

  async checkMileageInputValidation() {
    await expect(this.mileageInput).toHaveClass(/ng-invalid/);
    await expect(this.mileageInput).toHaveClass(/ng-touched/);
    await expect(this.mileageInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }

  async clickAddFuelExpenseButton(carName) {
    await this.getAddExpenseButton(carName).click();
  }
}
