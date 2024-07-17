import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';

// Async thunks
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (reqData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`${API_BASE_URL}/api/cart/add`, reqData.data, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const getCart = createAsyncThunk('cart/getCart', async (jwt, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`${API_BASE_URL}/api/cart/`, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (reqData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        'Content-Type': 'application/json',
      },
    };
    await axios.delete(`${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`, config);
    return reqData.cartItemId;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (reqData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`, reqData.data, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
    cartItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload.cartItems);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.cartItems;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove Cart Item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
