import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {DefaultCategories} from 'src/data/categories';

import {Category} from '../types';

interface CategoryState {
  selectedCategory: Category;
  categories: Category[];
}

const initialState: CategoryState = {
  selectedCategory: DefaultCategories[0],
  categories: DefaultCategories,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    saveCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action: PayloadAction<Category>) => {
      // TODO: Allow multiple category selection, and eventually category deselection
      state.selectedCategory = action.payload;
    },
  },
});

// actions
export const {saveCategories, selectCategory} = categoriesSlice.actions;

export default categoriesSlice.reducer;
