import {configureStore} from '@reduxjs/toolkit';

import categoriesReducer from '../reducer/category';
import leaderboardSlice from '../reducer/leaderboard';

const store = configureStore({
  reducer: {
    category: categoriesReducer,
    leader: leaderboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
