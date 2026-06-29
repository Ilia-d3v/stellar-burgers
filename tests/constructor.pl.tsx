import { expect, Page, test } from '@playwright/test';

const bunId = 'mock-bun';
const mainId = 'mock-main';
const bunName = 'Краторная булка N-200i';
const mainName = 'Биокотлета из марсианской Магнолии';
const orderNumber = '654321';

const mockApi = async (page: Page) => {
  await page.routeFromHAR('tests/hars/ingredients.har', {
    notFound: 'fallback',
    url: '**/api/**'
  });
  await page.routeFromHAR('tests/hars/user.har', {
    notFound: 'fallback',
    url: '**/api/**'
  });
  await page.routeFromHAR('tests/hars/orders.har', {
    notFound: 'fallback',
    url: '**/api/**'
  });
};

const addIngredient = async (page: Page, id: string) => {
  await page.getByTestId(`ingredient-${id}`).getByRole('button').click();
};

test.describe('Burger constructor', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page);
    await page.goto('/');
    await expect(page.getByTestId(`ingredient-${bunId}`)).toBeVisible();
  });

  test('adds a bun and a filling from the ingredient list', async ({
    page
  }) => {
    await addIngredient(page, bunId);
    await addIngredient(page, mainId);

    const constructor = page.getByTestId('burger-constructor');
    await expect(constructor.getByText(bunName)).toHaveCount(2);
    await expect(constructor.getByText(mainName)).toHaveCount(1);
  });
});

test.describe('Ingredient modal', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page);
    await page.goto('/');
    await expect(page.getByTestId(`ingredient-${mainId}`)).toBeVisible();
  });

  test('opens the selected ingredient details', async ({ page }) => {
    await page.getByTestId(`ingredient-${mainId}`).getByRole('link').click();

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByText(mainName)).toBeVisible();
    await expect(page).toHaveURL(`/ingredients/${mainId}`);
  });

  test('closes by clicking the close button', async ({ page }) => {
    await page.getByTestId(`ingredient-${mainId}`).getByRole('link').click();
    await page.getByTestId('modal-close').click();

    await expect(page.getByTestId('modal')).not.toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('closes by clicking the overlay', async ({ page }) => {
    await page.getByTestId(`ingredient-${mainId}`).getByRole('link').click();
    await page.getByTestId('modal-overlay').click({
      position: { x: 5, y: 5 }
    });

    await expect(page.getByTestId('modal')).not.toBeVisible();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Order creation', () => {
  test.beforeEach(async ({ context, page }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer mock-access-token',
        url: 'http://127.0.0.1:4000'
      }
    ]);
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });
    await mockApi(page);
    await page.goto('/');
    await expect(page.getByTestId(`ingredient-${bunId}`)).toBeVisible();
  });

  test.afterEach(async ({ context, page }) => {
    await page.evaluate(() => localStorage.clear());
    await context.clearCookies();
  });

  test('creates an order, shows its number and clears the constructor', async ({
    page
  }) => {
    await addIngredient(page, bunId);
    await addIngredient(page, mainId);

    await page.getByTestId('order-button').click();

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
    await expect(page.getByTestId('order-number')).toHaveText(orderNumber);

    const constructor = page.getByTestId('burger-constructor');
    await expect(constructor.getByText(bunName)).toHaveCount(0);
    await expect(constructor.getByText(mainName)).toHaveCount(0);

    await page.getByTestId('modal-close').click();
    await expect(modal).not.toBeVisible();
  });
});
