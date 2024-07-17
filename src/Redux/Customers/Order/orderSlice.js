import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';

// Async thunks
export const createOrder = createAsyncThunk('order/createOrder', async (reqData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };
    const { data } = await axios.post(`${API_BASE_URL}/api/orders/`, reqData.address, config);
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const getOrderById = createAsyncThunk('order/getOrderById', async (orderId, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const jwt = state.auth.jwt;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    };
    const { data } = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const getOrderHistory = createAsyncThunk('order/getOrderHistory', async (reqData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };
    const { data } = await axios.get(`${API_BASE_URL}/api/orders/user`, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    order: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Order by ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Order History
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orders = [];
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = [];
      });
  },
});

export default orderSlice.reducer;
