import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category} from 'src/redux/types';

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [
    {
      name: 'Cities',
      items: ['SINGAPORE'],
    },
    {
      name: 'Food',
      items: ['LAKSA'],
    },
    {
      name: 'Animals',
      items: ['BUTTERFLY'],
    },
    {
      name: 'Movies',
      items: ['AVENGERS'],
    },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    saveCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

// actions
export const {saveCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;
