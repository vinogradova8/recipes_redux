import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeFull } from '../types/RecipeFull';

const loadCartFromStorage = (): RecipeFull[] => {
  try {
    const stored = localStorage.getItem('cart');

    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: RecipeFull[] = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state: RecipeFull[], action: PayloadAction<RecipeFull>) {
      state.push(action.payload);
    },

    removeFromCart(state: RecipeFull[], action: PayloadAction<string>) {
      return state.filter(recipe => recipe.idMeal !== action.payload);
    },

    clearCart() {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
