import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import QuestionTiles from '../';
import {DefaultCategories} from 'src/data/categories';

const mockAnswer = [...DefaultCategories[0].items[0].answer];

describe('Component: QuestionTiles', () => {
  it('should render properly', () => {
    const snapshot = render(<QuestionTiles letters={mockAnswer} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('can handle press events', () => {
    const mockPress = jest.fn();
    const {getByTestId} = render(
      <QuestionTiles letters={mockAnswer} onPress={mockPress} />,
    );
    fireEvent.press(getByTestId(`category-button-${mockAnswer[0]}`));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
