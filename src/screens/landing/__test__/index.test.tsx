import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {render} from '@testing-library/react-native';

import {DefaultCategories} from 'src/data/categories';

import LandingScreen from '../';

const mockStore = configureStore();
const state = {
  category: {
    categories: DefaultCategories,
  },
};
const store = mockStore(state);

describe('Screen: Landing', () => {
  it('should render properly', () => {
    const snapshot = render(
      <Provider store={store}>
        <LandingScreen />
      </Provider>,
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
