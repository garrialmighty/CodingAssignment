import store from 'src/redux/store';

import {UserLeader} from 'src/data/userLeader';

import {addPoints, saveLeaders} from '..';

describe('Leaderboard Actions', () => {
  beforeEach(() => {
    store.dispatch(saveLeaders([UserLeader]));
  });

  it('can save leaders', () => {
    const defaultLeaders = store.getState().leader.leaders;
    expect(defaultLeaders).toEqual([UserLeader]); // should be the same with default

    store.dispatch(saveLeaders([]));
    expect(store.getState().leader.leaders.length).toEqual(0);
  });

  it('can increment points', () => {
    const defaultPoints = UserLeader.points;
    // TODO: Update how points are accumulated once more info and API's are available
    const defaultLeader = store.getState().leader.leaders[0];
    expect(defaultLeader.points).toEqual(defaultPoints);

    const points = 1;
    store.dispatch(addPoints(points));
    const userPoints = store.getState().leader.leaders[0].points;
    expect(userPoints).toEqual(defaultPoints + points);
  });
});
