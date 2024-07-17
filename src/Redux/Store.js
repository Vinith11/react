import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import customerProductReducer from './Customers/Product/productSlice';
import productReducer from './Admin/Product/adminProductSlice'
import cartReducer from './Customers/Cart/cartSlice';
import orderReducer from './Customers/Order/orderSlice';
import adminOrderReducer from './Admin/Orders/adminOrderSlice';
import reviewReducer from './Customers/Review/reviewSlice';

const rootReducer = {
  auth: authReducer,
  customersProduct: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  review: reviewReducer,

  //admin
  adminsProduct: productReducer,
  adminsOrder: adminOrderReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
