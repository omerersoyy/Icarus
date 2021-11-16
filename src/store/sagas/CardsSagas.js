import {call, put} from 'redux-saga/effects';
import R from 'ramda';
import CardsRedux from '../redux/CardsRedux';

export function* getAllCards(client) {
  const response = yield call(client.getAllCards);

  if (response.ok) {
    console.log(response);
    yield put(CardsRedux.getAllCardsSuccess(R.pathOr([], ['data'], response)));
  } else {
    yield put(CardsRedux.getAllCardsError(response.error));
  }
}
