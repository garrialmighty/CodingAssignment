import React from 'react';
import {Provider} from 'react-redux';

import LandingScreen from 'src/screens/landing';

import store from 'src/redux/store';

export default (): JSX.Element => (
  <Provider store={store}>
    <LandingScreen />
  </Provider>
);
