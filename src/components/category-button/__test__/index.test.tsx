import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CategoryButton from '../';

describe('Component: IconButton', () => {
  it('should render a CategoryButton', () => {
    const snapshot = render(<CategoryButton title="Mock Title" />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('can handle press events', () => {
    const mockPress = jest.fn();
    const {getByTestId} = render(
      <CategoryButton title="Mock Title" onPress={mockPress} />,
    );
    fireEvent.press(getByTestId('category-button-Mock Title'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
