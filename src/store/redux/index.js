import {combineReducers} from 'redux';
import rootSaga from '../sagas';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import transform from './utils/ImmutablePersistTransform';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {cardsReducer} from './CardsRedux';

export const reducers = combineReducers({
  cards: cardsReducer,
});

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [transform],
};

const persistedReducer = persistReducer(rootPersistConfig, reducers);

const initializeStore = (rootReducer, rootSaga) => {
  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default () => {
  let store = initializeStore(persistedReducer, rootSaga);
  let persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
