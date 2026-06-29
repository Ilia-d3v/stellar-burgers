import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

type TOrdersState = {
  feed: TOrdersData;
  profileOrders: TOrder[];
  currentOrder: TOrder | null;
  feedLoading: boolean;
  profileOrdersLoading: boolean;
  currentOrderLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  profileOrders: [],
  currentOrder: null,
  feedLoading: false,
  profileOrdersLoading: false,
  currentOrderLoading: false,
  error: null
};

export const getFeeds = createAsyncThunk('orders/getFeeds', getFeedsApi);

export const getProfileOrders = createAsyncThunk(
  'orders/getProfileOrders',
  getOrdersApi
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0] || null;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.feedLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feedLoading = false;
        state.feed = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.feedLoading = false;
        state.error = action.error.message || 'Failed to load feed';
      })
      .addCase(getProfileOrders.pending, (state) => {
        state.profileOrdersLoading = true;
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.profileOrdersLoading = false;
        state.profileOrders = action.payload;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.profileOrdersLoading = false;
        state.error = action.error.message || 'Failed to load orders';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.currentOrderLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.currentOrderLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.currentOrderLoading = false;
        state.error = action.error.message || 'Failed to load order';
      });
  }
});

export const { clearCurrentOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
