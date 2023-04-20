import React from 'react';
import {render} from '@testing-library/react-native';

import SuccessMessage from '../';

describe('Component: SuccessMessage', () => {
  it('should render properly', () => {
    const snapshot = render(<SuccessMessage points={99} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
