import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import QuestionScreen from '../';

jest.mock('src/hooks/useAppDispatch', () => jest.fn());

const mockBack = jest.fn();
const props = {
  navigation: {
    goBack: mockBack,
    setOptions: jest.fn(),
  },
};

jest.mock('../hooks/useIndexer', () => {
  const {DefaultCategories} = require('src/data/categories');
  return () => ({
    questionIndex: 1,
    totalQuestions: 1,
    question: 'Mock Question',
    answer: DefaultCategories[0].items[0].answer,
  });
});

describe('Screen: Landing', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('should render properly', () => {
    const snapshot = render(<QuestionScreen {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('navigates back when tapping Next on the last question', () => {
    const {getByTestId} = render(<QuestionScreen {...props} />);
    fireEvent.press(getByTestId('category-button-Skip'));
    expect(mockBack).toHaveBeenCalled();
  });
});
