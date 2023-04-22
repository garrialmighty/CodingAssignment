import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {UserLeader} from 'src/data/userLeader';

import {Leader} from '../types';

interface LeaderboardState {
  leaders: Leader[];
}

const initialState: LeaderboardState = {
  leaders: [UserLeader],
};

const leaderboardSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {
    saveLeaders: (state, action: PayloadAction<Leader[]>) => {
      state.leaders = action.payload;
    },
    addPoints: (state, action: PayloadAction<number>) => {
      // TODO: Update how points are accumulated once more info and API's are available
      state.leaders[0].points += action.payload;
    },
  },
});

// actions
export const {addPoints, saveLeaders} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
