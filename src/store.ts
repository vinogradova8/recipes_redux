import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './features/category';
import cartReducer from './features/cart';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
