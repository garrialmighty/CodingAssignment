import {configureStore} from '@reduxjs/toolkit';

import categoriesReducer from '../reducer/category';

const store = configureStore({
  reducer: {
    category: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
