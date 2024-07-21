import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api, { API_BASE_URL } from '../../config/api';

// Async thunks
export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);

    // Check if the response status is 200
    if (response.status === 200) {
      const user = response.data;
      if (user.jwt) localStorage.setItem('jwt', user.jwt);
      return user;
    } else {
      return rejectWithValue('Unexpected response status');
    }
  } catch (error) {
    // Handle error from API response
    const errorMessage = error.response && error.response.data && error.response.data.error 
                         ? error.response.data.error 
                         : error.message;
    return rejectWithValue(errorMessage);
  }
});

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);

    // Check if the response status is 200
    if (response.status === 200) {
      const user = response.data;
      if (user.jwt) localStorage.setItem('jwt', user.jwt);
      return user;
    } else {
      return rejectWithValue('Unexpected response status');
    }
  } catch (error) {
    // Handle error from API response
    const errorMessage = error.response && error.response.data && error.response.data.error 
                         ? error.response.data.error 
                         : error.message;
    return rejectWithValue(errorMessage);
  }
});

export const getUser = createAsyncThunk('auth/getUser', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const getAllCustomers = createAsyncThunk('auth/getAllCustomers', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    jwt: localStorage.getItem('jwt') || null,
    isLoading: false,
    error: null,
    customers: [],
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.customers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.jwt = action.payload.jwt;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.jwt = action.payload.jwt;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get All Customers
      .addCase(getAllCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
