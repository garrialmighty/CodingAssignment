import React from 'react';
import {Share} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {act, fireEvent, render} from '@testing-library/react-native';

import {UserLeader} from 'src/data/userLeader';

import LeaderboardScreen from '../';

const mockStore = configureStore();
const state = {
  leader: {
    leaders: [UserLeader],
  },
};
const store = mockStore(state);

describe('Screen: Leaderboard', () => {
  it('should render properly', () => {
    const snapshot = render(
      <Provider store={store}>
        <LeaderboardScreen />
      </Provider>,
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('can share points', () => {
    const mockShare = jest.fn();
    Share.share = mockShare;
    const {getByText} = render(
      <Provider store={store}>
        <LeaderboardScreen />
      </Provider>,
    );
    act(async () => await fireEvent.press(getByText('Share')));
    expect(mockShare).toHaveBeenCalled();
  });
});
