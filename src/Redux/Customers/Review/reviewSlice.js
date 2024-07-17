import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';

// Async thunks
export const createReview = createAsyncThunk('review/createReview', async (resData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/reviews/create`, resData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const getAllReviews = createAsyncThunk('review/getAllReviews', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/reviews/product/${productId}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const createRating = createAsyncThunk('review/createRating', async (resData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/ratings/create`, resData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const getAllRatings = createAsyncThunk('review/getAllRatings', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/ratings/product/${productId}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

// Slice
const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    ratings: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Reviews
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Rating
      .addCase(createRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings.push(action.payload);
      })
      .addCase(createRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Ratings
      .addCase(getAllRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(getAllRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
