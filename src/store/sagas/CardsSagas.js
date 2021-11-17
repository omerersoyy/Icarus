import {call, put} from 'redux-saga/effects';
import R from 'ramda';
import CardsRedux from '../redux/CardsRedux';
import {groupBy} from '../../view/utils/DataHelpers';

export function* getAllCards(client) {
  const response = yield call(client.getAllCards);

  if (response.ok) {
    const data = R.pathOr([], ['data'], response);
    const {all, grouped} = groupBy(data, 'mechanics');
    yield put(CardsRedux.getAllCardsSuccess(all, grouped));
  } else {
    yield put(CardsRedux.getAllCardsError(response.error));
  }
}
