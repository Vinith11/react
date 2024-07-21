import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';

// Async thunks
export const findProducts = createAsyncThunk('product/findProducts', async (reqData, { getState, rejectWithValue }) => {
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const state = getState();
    const jwt = state.auth.jwt;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjE1NDg3NTIsImV4cCI6MTcyMTYzNTE1MiwiZW1haWwiOiJ2aW5pdGhAZ21haWwuY29tIn0.lUk6dJcN8tNMYfiX1bJX7ZBvXEPE6M62-xEycAXF6A2b7UQg8v7Zqzy44HCIx89i`,
      },
    };
    const { data } = await axios.get(
      `${API_BASE_URL}/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      config
    );
    console.log('API Response:', data);
    console.log('API Content :', data.content);
    
    return data.content; // Extracting content field
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const findProductById = createAsyncThunk('product/findProductById', async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/products/id/${reqData.productId}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const searchProduct = createAsyncThunk('product/searchProduct', async (keyword, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/products/search`, { params: { q: keyword } });
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const createProduct = createAsyncThunk('product/createProduct', async (product, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/admin/products/`, product.data);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async (product, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_BASE_URL}/api/admin/products/${product.productId}`, product);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/api/admin/products/${productId}/delete`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    searchProducts: [],
    deleteProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Find Products by Category
      .addCase(findProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(findProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Set the products state
      })
      .addCase(findProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      })
      // Find Product by ID
      .addCase(findProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(findProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Product
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProducts = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
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
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
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
        state.deleteProduct = action.payload;
        state.products = state.products.filter(product => product.id !== action.meta.arg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
