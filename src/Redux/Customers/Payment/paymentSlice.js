import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';

// Async thunks
export const createPayment = createAsyncThunk('payment/createPayment', async (reqData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };

    const { data } = await axios.post(`${API_BASE_URL}/api/payments/${reqData.orderId}`, reqData, config);
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const updatePayment = createAsyncThunk('payment/updatePayment', async (reqData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };
    const { data } = await axios.get(`${API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    success: false,
    paymentResult: null,
    payment: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Payment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paymentResult = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Payment
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
        state.error = '';
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.payment = {};
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
