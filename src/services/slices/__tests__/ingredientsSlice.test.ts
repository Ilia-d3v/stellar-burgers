import ingredientsReducer, { getIngredients } from '../ingredientsSlice';
import { bun, main, sauce } from './fixtures';

describe('ingredientsSlice reducer', () => {
  test('returns the initial state for an unknown action', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      items: [],
      isLoading: false,
      error: null
    });
  });

  test('sets loading and clears an old error on getIngredients.pending', () => {
    const rejectedState = ingredientsReducer(
      undefined,
      getIngredients.rejected(
        new Error('Network error'),
        'request-id',
        undefined
      )
    );

    expect(
      ingredientsReducer(
        rejectedState,
        getIngredients.pending('request-id', undefined)
      )
    ).toEqual({
      items: [],
      isLoading: true,
      error: null
    });
  });

  test('stores ingredients on getIngredients.fulfilled', () => {
    const ingredients = [bun, main, sauce];

    expect(
      ingredientsReducer(
        undefined,
        getIngredients.fulfilled(ingredients, 'request-id', undefined)
      )
    ).toEqual({
      items: ingredients,
      isLoading: false,
      error: null
    });
  });

  test('stores an error on getIngredients.rejected', () => {
    expect(
      ingredientsReducer(
        undefined,
        getIngredients.rejected(
          new Error('Network error'),
          'request-id',
          undefined
        )
      )
    ).toEqual({
      items: [],
      isLoading: false,
      error: 'Network error'
    });
  });

  test('uses a fallback error for getIngredients.rejected', () => {
    const result = ingredientsReducer(undefined, {
      type: getIngredients.rejected.type,
      error: {}
    });

    expect(result.error).toBe('Failed to load burger ingredients');
  });
});
