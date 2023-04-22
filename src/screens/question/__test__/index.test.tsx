import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {DefaultCategories} from 'src/data/categories';
import * as LeaderboardActions from 'src/redux/reducer/leaderboard';

import QuestionScreen from '../';

jest.mock('src/hooks/useAppDispatch', () => {
  return () => jest.fn();
});

jest.mock('src/util/shuffle', () => ({
  shuffle: jest.fn().mockImplementation(array => array),
}));

const mockQuestion = DefaultCategories[0].items[0];

const mockBack = jest.fn();
const props = {
  navigation: {
    goBack: mockBack,
    setOptions: jest.fn(),
  },
};

describe('Screen: Landing', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('should render properly', () => {
    const useIndexer = jest.requireActual('../hooks/useIndexer.tsx');
    jest.spyOn(useIndexer, 'default').mockImplementation(() => ({
      questionIndex: 1,
      totalQuestions: 1,
      question: 'Mock Question',
      answer: mockQuestion.answer,
    }));

    const snapshot = render(<QuestionScreen {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('navigates back when tapping Next on the last question', () => {
    const useIndexer = jest.requireActual('../hooks/useIndexer.tsx');
    jest.spyOn(useIndexer, 'default').mockImplementation(() => ({
      questionIndex: 1,
      totalQuestions: 1,
      question: 'Mock Question',
      answer: mockQuestion.answer,
    }));

    const {getByTestId} = render(<QuestionScreen {...props} />);
    fireEvent.press(getByTestId('category-button-Skip'));
    expect(mockBack).toHaveBeenCalled();
  });

  it('adds points and fetches the next question when user correctly guesses the answer', () => {
    const useIndexer = jest.requireActual('../hooks/useIndexer.tsx');
    const mockGetNextQuestion = jest.fn();
    jest.spyOn(useIndexer, 'default').mockImplementation(() => ({
      questionIndex: 1,
      totalQuestions: 2,
      question: 'Mock Question',
      answer: mockQuestion.answer,
      getNextQuestion: mockGetNextQuestion,
    }));

    const useGameEngine = jest.requireActual('../hooks/useGameEngine.tsx');
    jest
      .spyOn(useGameEngine, 'default')
      .mockImplementation(() => ({hasCorrectlyAnswered: true}));

    const addPointsSpy = jest.spyOn(LeaderboardActions, 'addPoints');

    const {getByTestId} = render(<QuestionScreen {...props} />);
    fireEvent.press(getByTestId('category-button-Next'));
    expect(addPointsSpy).toHaveBeenCalled();
    expect(mockGetNextQuestion).toHaveBeenCalledWith();
  });
});
