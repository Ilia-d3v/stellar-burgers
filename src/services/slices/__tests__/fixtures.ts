import { TConstructorIngredient, TIngredient } from '@utils-types';

export const bun: TIngredient = {
  _id: 'mock-bun',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://example.com/bun.png',
  image_large: 'https://example.com/bun-large.png',
  image_mobile: 'https://example.com/bun-mobile.png'
};

export const main: TIngredient = {
  _id: 'mock-main',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 100,
  fat: 24,
  carbohydrates: 42,
  calories: 4242,
  price: 424,
  image: 'https://example.com/main.png',
  image_large: 'https://example.com/main-large.png',
  image_mobile: 'https://example.com/main-mobile.png'
};

export const sauce: TIngredient = {
  _id: 'mock-sauce',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://example.com/sauce.png',
  image_large: 'https://example.com/sauce-large.png',
  image_mobile: 'https://example.com/sauce-mobile.png'
};

export const mainWithId: TConstructorIngredient = {
  ...main,
  id: 'constructor-main'
};

export const sauceWithId: TConstructorIngredient = {
  ...sauce,
  id: 'constructor-sauce'
};

export const orderResponse = {
  success: true,
  name: 'Космический бургер',
  order: {
    _id: 'mock-order',
    status: 'done',
    name: 'Космический бургер',
    owner: {
      name: 'Илья',
      email: 'ilya@example.com',
      createdAt: '2026-06-29T10:00:00.000Z',
      updatedAt: '2026-06-29T10:00:00.000Z'
    },
    createdAt: '2026-06-29T10:00:00.000Z',
    updatedAt: '2026-06-29T10:00:00.000Z',
    number: 654321,
    price: 2934
  }
};
