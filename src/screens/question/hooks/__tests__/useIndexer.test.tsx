import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {renderHook, act} from '@testing-library/react-hooks';

import {DefaultCategories} from 'src/data/categories';

import useIndexer from '../useIndexer';

const mockCategory = DefaultCategories[0];
const mockStore = configureStore();
const state = {
  category: {
    selectedCategory: mockCategory,
  },
};

const wrapper = ({children}) => (
  <Provider store={mockStore(state)}>{children}</Provider>
);

describe('useIndexer', () => {
  it('tracks index', () => {
    const {result} = renderHook(() => useIndexer(), {wrapper});
    expect(result.current.questionIndex).toEqual(1);
    act(() => result.current.getNextQuestion());
    expect(result.current.questionIndex).toEqual(mockCategory.items.length);

    // call getNextQuestion more than the number of questions
    for (let index = 0; index < mockCategory.items.length + 2; index++) {
      act(() => result.current.getNextQuestion());
    }

    expect(result.current.questionIndex).toEqual(mockCategory.items.length);
  });

  it('returns the total number of question for a selected category', () => {
    const {result} = renderHook(() => useIndexer(), {wrapper});
    expect(result.current.totalQuestions).toEqual(mockCategory.items.length);
  });

  it('tracks the current question, answer and points', () => {
    const mockQuestion = mockCategory.items[0];
    const {result} = renderHook(() => useIndexer(), {wrapper});
    expect(result.current.question).toEqual(mockQuestion.description);
    expect(result.current.answer).toEqual(mockQuestion.answer);
    expect(result.current.points).toEqual(mockQuestion.points);
  });
});
