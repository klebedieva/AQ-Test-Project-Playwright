// @ts-check
import { test, expect } from '@playwright/test';
import { RegistrationModal } from '../poms/modalPoms';
import { validUser, errorMessages } from '../data/testData';

test.describe('Sign Up tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show error if name and last name are less than 2 characters', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    await registration.fillForm({
      name: 'A',
      lastName: 'B',
      email: validUser.email,
      password: validUser.password,
      repeatPassword: validUser.password,
    });
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupName', errorMessages.nameTooShort);
    await registration.expectFieldToHaveError('#signupLastName', errorMessages.lastNameTooShort);
  });
  

  test('should show error if name and last name are more than 20 characters', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    const longName = 'a'.repeat(21);
  
    await registration.fillForm({
      name: longName,
      lastName: longName,
      email: validUser.email,
      password: validUser.password,
      repeatPassword: validUser.password,
    });
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupName', errorMessages.nameTooShort);
    await registration.expectFieldToHaveError('#signupLastName', errorMessages.lastNameTooShort);
  });
  
  test('should show error if name and last name are empty', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    await registration.blurField(registration.selectors.nameInput);
    await registration.blurField(registration.selectors.lastNameInput);
  
    await registration.fillForm({
      name: '',
      lastName: '',
      email: validUser.email,
      password: validUser.password,
      repeatPassword: validUser.password,
    });
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupName', errorMessages.nameRequired);
    await registration.expectFieldToHaveError('#signupLastName', errorMessages.lastNameRequired);
  });
  
  test('should show error if name and last name are numbers', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    await registration.fillForm({
      name: '123',
      lastName: '123',
      email: validUser.email,
      password: validUser.password,
      repeatPassword: validUser.password,
    });
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupName', errorMessages.nameInvalid);
    await registration.expectFieldToHaveError('#signupLastName', errorMessages.lastNameInvalid);
  });
  
  test('should show error if email is without @', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    await registration.fillForm({
      name: validUser.name,
      lastName: validUser.lastName,
      email: 'test', // invalid email
      password: validUser.password,
      repeatPassword: validUser.password,
    });
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupEmail', errorMessages.emailIncorrect);
  });
  
  test('should show error if email is with invalid domain', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    await registration.fillForm({
      name: validUser.name,
      lastName: validUser.lastName,
      email: 'test@test', // invalid domain
      password: validUser.password,
      repeatPassword: validUser.password,
    });
  
    await expect(registration.selectors.registerButton).toBeDisabled();
    await registration.expectFieldToHaveError('#signupEmail', errorMessages.emailIncorrect);
  });
  
  
  test('should show error if email, password and re-enter password are empty', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    await registration.fillName(validUser.name);
    await registration.fillLastName(validUser.lastName);
  
    await registration.blurField(registration.selectors.emailInput);
    await registration.blurField(registration.selectors.passwordInput);
    await registration.blurField(registration.selectors.repeatPasswordInput);
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupEmail', errorMessages.emailRequired);
    await registration.expectFieldToHaveError('#signupPassword', errorMessages.passwordRequired);
    await registration.expectFieldToHaveError('#signupRepeatPassword', errorMessages.repeatPasswordRequired);
  });
  
  test('should show error if password and re-enter password do not match', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    await registration.fillForm({
      ...validUser,
      repeatPassword: validUser.password + '1', // mismatched password
    });
  
    await registration.blurField(registration.selectors.repeatPasswordInput);
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupRepeatPassword', errorMessages.repeatPasswordMismatch);
  });

  test('should show error if password is less than 8 characters', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    const shortPassword = 'Passwo1'; // 7 characters
  
    await registration.fillForm({
      ...validUser,
      password: shortPassword,
      repeatPassword: shortPassword,
    });
  
    await registration.blurField(registration.selectors.repeatPasswordInput);
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupPassword', errorMessages.passwordWeak);
    await registration.expectFieldToHaveError('#signupRepeatPassword', errorMessages.passwordWeak);
  });
  
  test('should show error if password is without capital letter', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    const noCapitalPassword = 'password1';
  
    await registration.fillForm({
      ...validUser,
      password: noCapitalPassword,
      repeatPassword: noCapitalPassword,
    });
  
    await registration.blurField(registration.selectors.repeatPasswordInput);
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupPassword', errorMessages.passwordWeak);
    await registration.expectFieldToHaveError('#signupRepeatPassword', errorMessages.passwordWeak);
  });

  test('should show error if password is only numbers', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    const numericPassword = '12345678';
  
    await registration.fillForm({
      ...validUser,
      password: numericPassword,
      repeatPassword: numericPassword,
    });
  
    await registration.blurField(registration.selectors.repeatPasswordInput);
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupPassword', errorMessages.passwordWeak);
    await registration.expectFieldToHaveError('#signupRepeatPassword', errorMessages.passwordWeak);
  });

  test('should show error if password is more than 15 characters', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    const longPassword = 'Password11111111'; // 16 characters
  
    await registration.fillForm({
      ...validUser,
      password: longPassword,
      repeatPassword: longPassword,
    });
  
    await registration.blurField(registration.selectors.repeatPasswordInput);
  
    await expect(registration.selectors.registerButton).toBeDisabled();
  
    await registration.expectFieldToHaveError('#signupPassword', errorMessages.passwordWeak);
    await registration.expectFieldToHaveError('#signupRepeatPassword', errorMessages.passwordWeak);
  });
  
  test('should successfully sign up with valid details', async ({ page }) => {
    const registration = new RegistrationModal(page);
    await registration.openModal();
  
    await registration.fillForm({
      ...RegistrationModal.testData,
      repeatPassword: RegistrationModal.testData.password,
    });
  
    await expect(registration.selectors.registerButton).toBeEnabled();
    await registration.submit();
  
    await expect(page).toHaveURL(/\/garage/);
    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
  });

});