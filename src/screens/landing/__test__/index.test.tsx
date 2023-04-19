import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {render} from '@testing-library/react-native';

import LandingScreen from '../';

const mockStore = configureStore();
const state = {
  category: {
    categories: [],
  },
};
const store = mockStore(state);

describe('Screen: Landing', () => {
  it('should render properly', () => {
    const {toJSON} = render(
      <Provider store={store}>
        <LandingScreen />
      </Provider>,
    );
    expect(toJSON).toMatchSnapshot();
  });
});
