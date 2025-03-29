import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 'All';

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(_state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
