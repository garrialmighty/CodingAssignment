import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {fireEvent, render} from '@testing-library/react-native';

import {DefaultCategories} from 'src/data/categories';

import LandingScreen from '../';

const mockNavigate = jest.fn();
const props = {
  navigation: {
    navigate: mockNavigate,
  },
};

const mockStore = configureStore();
const state = {
  category: {
    categories: DefaultCategories,
    selectedCategory: DefaultCategories[0],
  },
};
const store = mockStore(state);

describe('Screen: Landing', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render properly', () => {
    const snapshot = render(
      <Provider store={store}>
        <LandingScreen {...props} />
      </Provider>,
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('can navigate to Question screen', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LandingScreen {...props} />
      </Provider>,
    );
    fireEvent.press(getByTestId('category-button-Start'));
    expect(mockNavigate).toHaveBeenCalledWith('Question');
  });

  it('can navigate to Leaderboard screen', () => {
    const {getByText} = render(
      <Provider store={store}>
        <LandingScreen {...props} />
      </Provider>,
    );
    fireEvent.press(getByText('Leaderboards'));
    expect(mockNavigate).toHaveBeenCalledWith('Leaderboards');
  });
});
