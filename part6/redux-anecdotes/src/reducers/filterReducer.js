import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterQuote: (state, action) => {
      return action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filterQuote } = filterSlice.actions;
