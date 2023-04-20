import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import AppContainer from './container';

import store from 'src/redux/store';

export default (): JSX.Element => (
  <NavigationContainer>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </NavigationContainer>
);
