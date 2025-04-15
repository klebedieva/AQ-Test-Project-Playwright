// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Sign Up tests', () => {
  const email = 'aqa-dinwinchester04@gmail.com';
  const password = 'Password1';
  const name = 'Din';
  const lastName = 'Winchester';
  const nameError1 = 'Name has to be from 2 to 20 characters long';
  const nameError2 = 'Name required';
  const lastNameError1 = 'Last name has to be from 2 to 20 characters long';
  const lastNameError2 = 'Last name required';
  const emailError1 = 'Email is incorrect';
  const emailError3 = 'Email required';
  const passwordError1 = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
  const nameError3 = 'Name is invalid';
  const lastNameError3 = 'Last name is invalid';
  const passwordError2 = 'Password required';
  const repeatPasswordErrror1 = 'Re-enter password required';
  const repeatPasswordErrror2 = 'Passwords do not match';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show error if name and last name are less than 2 characters', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
    await page.fill('#signupName', 'A');
    await page.fill('#signupLastName', 'B');
    await page.fill('#signupEmail', email);
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();

    const nameError = page.locator('#signupName').locator('..').getByText(nameError1);
    await expect(nameError).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    const lastNameError = page.locator('#signupLastName').locator('..').getByText(lastNameError1);
    await expect(lastNameError).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });


  test('should show error if name and last name are more than 20 characters', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
  
    const longName = 'aaaaaaaaaaaaaaaaaaaaa'; // 21 characters
  
    await page.fill('#signupName', longName);
    await page.fill('#signupLastName', longName);
    await page.fill('#signupEmail', email);
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const nameError = page.locator('#signupName').locator('..').getByText(nameError1);
    await expect(nameError).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  
    const lastNameError = page.locator('#signupLastName').locator('..').getByText(lastNameError1);
    await expect(lastNameError).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
  
  test('should show error if name and last name are empty', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
    await page.locator('#signupName').focus();
    await page.locator('#signupName').evaluate(el => el.blur());
    await page.locator('#signupLastName').focus();
    await page.locator('#signupLastName').evaluate(el => el.blur());

  
    await page.fill('#signupEmail', email);
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const nameError = page.locator('#signupName').locator('..').getByText(nameError2);
    await expect(nameError).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  
    const lastNameError = page.locator('#signupLastName').locator('..').getByText(lastNameError2);
    await expect(lastNameError).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('should show error if name and last name are numbers', async ({ page }) => {
    await page.click('button:has-text("Sign up")');

    await page.fill('#signupName', '123');
    await page.fill('#signupLastName', '123');
    await page.fill('#signupEmail', email);
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const nameError = page.locator('#signupName').locator('..').getByText(nameError3);
    await expect(nameError).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    const lastNameError = page.locator('#signupLastName').locator('..').getByText(lastNameError3);
    await expect(lastNameError).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
  
  test('should show error if email is without @', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
  
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.fill('#signupEmail', 'test'); 
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const emailError = page.locator('#signupEmail').locator('..').getByText(emailError1);
    await expect(emailError).toBeVisible();
    await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('should show error if email is with invalid domain', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
  
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.fill('#signupEmail', 'test@test'); 
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const emailError = page.locator('#signupEmail').locator('..').getByText(emailError1);
    await expect(emailError).toBeVisible();
    await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('should show error if email, password and re-enter password are empty', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
  
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.locator('#signupEmail').focus();
    await page.locator('#signupEmail').evaluate(el => el.blur());
    await page.locator('#signupPassword').focus();
    await page.locator('#signupPassword').evaluate(el => el.blur());
    await page.locator('#signupRepeatPassword').focus();
    await page.locator('#signupRepeatPassword').evaluate(el => el.blur());
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const emailError = page.locator('#signupEmail').locator('..').getByText(emailError3);
    await expect(emailError).toBeVisible();
    await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    const passwordError = page.locator('#signupPassword').locator('..').getByText(passwordError2);
    await expect(passwordError).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  
    const repeatError = page.locator('#signupRepeatPassword').locator('..').getByText(repeatPasswordErrror1);
    await expect(repeatError).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });  

  test('should show error if password and re-enter password do not match', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.fill('#signupEmail', email);
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password + '1');
    await page.locator('#signupRepeatPassword').evaluate(el => el.blur());
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const repeatPasswordError = page.locator('#signupRepeatPassword').locator('..').locator(`text=${repeatPasswordErrror2}`);
    await expect(repeatPasswordError).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('should show error if password is less than 8 characters', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.fill('#signupEmail', email);
  
    const shortPassword = 'Passwo1';
    await page.fill('#signupPassword', shortPassword);
    await page.fill('#signupRepeatPassword', shortPassword);
    await page.locator('#signupRepeatPassword').evaluate(el => el.blur());
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();;
  
    const passwordError = page.locator('#signupPassword').locator('..').locator(`text=${passwordError1}`);
    await expect(passwordError).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  
    const repeatPasswordError = page.locator('#signupRepeatPassword').locator('..').locator(`text=${passwordError1}`);
    await expect(repeatPasswordError).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('should show error if password is without capital letter', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.fill('#signupEmail', email);
  
    const noCapitalPassword = 'password1';
    await page.fill('#signupPassword', noCapitalPassword);
    await page.fill('#signupRepeatPassword', noCapitalPassword);
    await page.locator('#signupRepeatPassword').evaluate(el => el.blur());
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const passwordError = page.locator('#signupPassword').locator('..').locator(`text=${passwordError1}`);
    await expect(passwordError).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  
    const repeatPasswordError = page.locator('#signupRepeatPassword').locator('..').locator(`text=${passwordError1}`);
    await expect(repeatPasswordError).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('should show error if password is only numbers', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.fill('#signupEmail', email);
  
    const numericPassword = '12345678';
    await page.fill('#signupPassword', numericPassword);
    await page.fill('#signupRepeatPassword', numericPassword);
    await page.locator('#signupRepeatPassword').evaluate(el => el.blur());
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
    const passwordError = page.locator('#signupPassword').locator('..').locator(`text=${passwordError1}`);
    await expect(passwordError).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  
    const repeatPasswordError = page.locator('#signupRepeatPassword').locator('..').locator(`text=${passwordError1}`);
    await expect(repeatPasswordError).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
  
  
  test('should show error if password is more than 15 characters', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.fill('#signupEmail', email);
  
    const longPassword = 'Password11111111'; // 16 characters
    await page.fill('#signupPassword', longPassword);
    await page.fill('#signupRepeatPassword', longPassword);
    await page.locator('#signupRepeatPassword').evaluate(el => el.blur());

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  
  
    const passwordError = page.locator('#signupPassword').locator('..').locator(`text=${passwordError1}`);
    await expect(passwordError).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  
    const repeatPasswordError = page.locator('#signupRepeatPassword').locator('..').locator(`text=${passwordError1}`);
    await expect(repeatPasswordError).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });    

  test('should successfully sign up with valid details', async ({ page }) => {
    await page.click('button:has-text("Sign up")');
    await page.fill('#signupName', name);
    await page.fill('#signupLastName', lastName);
    await page.fill('#signupEmail', email);
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);
  
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeEnabled();
    await registerButton.click();
  
    await expect(page).toHaveURL(/\/garage/);
    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();;
  });
});