import React from 'react';
import createStore from './src/store/redux';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigation from './src/view/navigation/MainNavigation';

const {store, persistor} = createStore();

const Root = () => (
  <NavigationContainer>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  </NavigationContainer>
);

export default Root;
