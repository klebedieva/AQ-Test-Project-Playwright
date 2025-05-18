import { test, expect } from '@playwright/test';

// Use saved authentication session for all tests in this file
test.use({ storageState: 'storage/session-storage.json' });

let apiContext;

// Set up API context with saved session before all tests
test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://qauto.forstudy.space',
    storageState: 'storage/session-storage.json',
  });
});

// Clean up API context after all tests
test.afterAll(async () => {
  await apiContext.dispose();
});


test('User is already logged in and can access garage', async ({ page }) => {
  await page.goto('https://qauto.forstudy.space/panel/garage');
  await expect(page).toHaveURL(/\/panel\/garage/);
});

// -------- UI Test: Mocked User Profile --------

test('Mock user profile response and verify displayed data', async ({ page }) => {
  await page.route('**/api/users/profile', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          userId: 999999,
          photoFilename: 'test-user-image.png',
          name: 'TestName',
          lastName: 'TestSurname',
        },
      }),
    });
  });

  await page.goto('https://qauto.forstudy.space/panel/profile');
  // Verify that mocked name is displayed
  await expect(page.getByText('TestName TestSurname')).toBeVisible();
  // Verify that mocked user image is displayed
  const userImage = page.locator('img.profile_photo');
  await expect(userImage).toBeVisible();
  await expect(userImage).toHaveAttribute('src', /test-user-image\.png$/);
});

// -------- API Tests: /api/cars POST --------

test('API: should successfully create a car', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.status).toBe('ok');
  expect(body.data.carBrandId).toBe(1);
  expect(body.data.carModelId).toBe(1);
  expect(body.data.mileage).toBe(122);
});

test('API: should fail when mileage is missing', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1,
      // mileage is missing
    },
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.status).toBe('error');
  expect(body.message).toBe('Mileage is required');
});

test('API: should fail when modelId is invalid', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 9999, // Invalid model ID
      mileage: 100,
    },
  });

  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body.status).toBe('error');
  expect(body.message).toBe('Model not found');
});
