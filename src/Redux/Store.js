import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/Reducer';
import customerProductReducer from './Customers/Product/Reducer';
import productReducer from './Admin/Product/Reducer';
import cartReducer from './Customers/Cart/Reducer';
import { orderReducer } from './Customers/Order/Reducer';
import adminOrderReducer from './Admin/Orders/Reducer';
import reviewReducer from './Customers/Review/Reducer';

const rootReducer = {
  auth: authReducer,
  customersProduct: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  review: reviewReducer,
  adminsProduct: productReducer,
  adminsOrder: adminOrderReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
