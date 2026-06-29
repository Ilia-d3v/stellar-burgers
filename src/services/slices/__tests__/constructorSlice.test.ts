import constructorReducer, {
  addIngredient,
  closeOrderModal,
  createOrder,
  moveIngredient,
  removeIngredient
} from '../constructorSlice';
import {
  bun,
  main,
  mainWithId,
  orderResponse,
  sauce,
  sauceWithId
} from './fixtures';

describe('constructorSlice reducer', () => {
  test('returns the initial state for an unknown action', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null
    });
  });

  test('adds and replaces a bun with addIngredient', () => {
    const stateWithBun = constructorReducer(undefined, addIngredient(bun));
    const replacementBun = { ...bun, _id: 'another-bun' };

    const result = constructorReducer(
      stateWithBun,
      addIngredient(replacementBun)
    );

    expect(result.constructorItems.bun).toEqual(replacementBun);
  });

  test('adds a filling with a generated id using addIngredient', () => {
    const result = constructorReducer(undefined, addIngredient(main));

    expect(result.constructorItems.ingredients).toEqual([
      expect.objectContaining({
        ...main,
        id: expect.any(String)
      })
    ]);
  });

  test('removes a filling by its constructor id', () => {
    const state = {
      constructorItems: {
        bun,
        ingredients: [mainWithId, sauceWithId]
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null
    };

    const result = constructorReducer(state, removeIngredient(mainWithId.id));

    expect(result.constructorItems.ingredients).toEqual([sauceWithId]);
  });

  test('moves a filling to a new position', () => {
    const state = {
      constructorItems: {
        bun,
        ingredients: [mainWithId, sauceWithId]
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null
    };

    const result = constructorReducer(
      state,
      moveIngredient({ from: 0, to: 1 })
    );

    expect(result.constructorItems.ingredients).toEqual([
      sauceWithId,
      mainWithId
    ]);
  });

  test('keeps fillings unchanged when the target position is invalid', () => {
    const state = {
      constructorItems: {
        bun,
        ingredients: [mainWithId, sauceWithId]
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null
    };

    const result = constructorReducer(
      state,
      moveIngredient({ from: 0, to: 2 })
    );

    expect(result).toEqual(state);
  });

  test('opens the request state on createOrder.pending', () => {
    const result = constructorReducer(
      undefined,
      createOrder.pending('request-id', [bun._id, main._id, bun._id])
    );

    expect(result.orderRequest).toBe(true);
    expect(result.orderError).toBeNull();
  });

  test('stores the order and clears the constructor on createOrder.fulfilled', () => {
    const state = {
      constructorItems: {
        bun,
        ingredients: [mainWithId]
      },
      orderRequest: true,
      orderModalData: null,
      orderError: null
    };

    const result = constructorReducer(
      state,
      createOrder.fulfilled(orderResponse, 'request-id', [
        bun._id,
        main._id,
        bun._id
      ])
    );

    expect(result.orderRequest).toBe(false);
    expect(result.orderModalData).toEqual({
      ...orderResponse.order,
      ingredients: []
    });
    expect(result.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('stores an error on createOrder.rejected', () => {
    const result = constructorReducer(
      undefined,
      createOrder.rejected(new Error('Order error'), 'request-id', [
        bun._id,
        main._id,
        bun._id
      ])
    );

    expect(result.orderRequest).toBe(false);
    expect(result.orderError).toBe('Order error');
  });

  test('uses a fallback error on createOrder.rejected', () => {
    const result = constructorReducer(undefined, {
      type: createOrder.rejected.type,
      error: {}
    });

    expect(result.orderError).toBe('Failed to create order');
  });

  test('clears order data with closeOrderModal', () => {
    const stateWithOrder = constructorReducer(
      undefined,
      createOrder.fulfilled(orderResponse, 'request-id', [
        bun._id,
        main._id,
        bun._id
      ])
    );

    const result = constructorReducer(stateWithOrder, closeOrderModal());

    expect(result.orderModalData).toBeNull();
  });
});
