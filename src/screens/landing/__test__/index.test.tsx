import React from 'react';
import {render} from '@testing-library/react-native';

import LandingScreen from '../';

describe('Screen: Landing', () => {
  it('should render properly', () => {
    const {toJSON} = render(<LandingScreen />);
    expect(toJSON).toMatchSnapshot();
  });
});
