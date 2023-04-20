import React from 'react';
import {render} from '@testing-library/react-native';

import QuestionScreen from '../';

jest.mock('src/hooks/useAppDispatch', () => jest.fn());

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
  it('should render properly', () => {
    const snapshot = render(<QuestionScreen />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
