import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { API_BASE_URL } from '../../../config/api';

// Async thunks
export const getProducts = createAsyncThunk('adminProducts/getProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/admin/products/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const createProduct = createAsyncThunk('adminProducts/createProduct', async (product, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/admin/products/`, product.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const updateProduct = createAsyncThunk('adminProducts/updateProduct', async (product, { rejectWithValue }) => {
  try {
    const response = await api.put(`${API_BASE_URL}/api/admin/products/${product.productId}`, product);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const deleteProduct = createAsyncThunk('adminProducts/deleteProduct', async (productId, { rejectWithValue }) => {
  try {
    await api.delete(`/api/admin/products/${productId}`);
    return productId;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
