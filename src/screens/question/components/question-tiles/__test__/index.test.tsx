import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {DefaultCategories} from 'src/data/categories';
import {ChoiceData} from 'src/screens/question/hooks/useGameEngine';

import QuestionTiles from '../';
const mockAnswers: ChoiceData[] = [...DefaultCategories[0].items[0].answer].map(
  (letter, originIndex) => ({letter, originIndex}),
);

describe('Component: QuestionTiles', () => {
  it('should render properly', () => {
    const snapshot = render(<QuestionTiles data={mockAnswers} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('can indicate an incorrect guess', () => {
    const snapshot = render(
      <QuestionTiles data={mockAnswers} incorrect />,
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('can handle press events', () => {
    const mockPress = jest.fn();
    const {getByTestId} = render(
      <QuestionTiles data={mockAnswers} onPress={mockPress} />,
    );
    fireEvent.press(getByTestId(`category-button-${mockAnswers[0].letter}`));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
