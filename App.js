import React from 'react';
import createStore from './src/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import './src/utils/i18n';
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
