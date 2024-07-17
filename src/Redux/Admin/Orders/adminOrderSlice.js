// adminOrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../config/api';

export const getOrders = createAsyncThunk('adminOrders/getOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/admin/orders/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const confirmOrder = createAsyncThunk('adminOrders/confirmOrder', async (orderId, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const shipOrder = createAsyncThunk('adminOrders/shipOrder', async (orderId, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/ship`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deliveredOrder = createAsyncThunk('adminOrders/deliveredOrder', async (orderId, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const cancelOrder = createAsyncThunk('adminOrders/cancelOrder', async (orderId, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteOrder = createAsyncThunk('adminOrders/deleteOrder', async (orderId, { rejectWithValue }) => {
  try {
    await api.delete(`/api/admin/orders/${orderId}/delete`);
    return orderId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    loading: false,
    orders: [],
    error: '',
    confirmed: null,
    placed: null,
    delivered: null,
    canceled: null,
    shipped: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = '';
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.orders = [];
        state.error = action.payload;
      })
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmed = action.payload;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(shipOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(shipOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.shipped = action.payload;
      })
      .addCase(shipOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deliveredOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deliveredOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.delivered = action.payload;
      })
      .addCase(deliveredOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.canceled = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
