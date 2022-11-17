import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { filter: '' },
  reducers: {
    update(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { update } = filterSlice.actions;
