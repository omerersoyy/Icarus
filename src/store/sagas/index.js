import {all, takeEvery} from 'redux-saga/effects';
import {createClient} from '../../model/service/Client';
import {CardsActionTypes} from '../redux/CardsRedux';
import {getAllCards} from './CardsSagas';

const client = createClient();

export default function* root() {
  yield all([takeEvery(CardsActionTypes.GET_ALL_CARDS, getAllCards, client)]);
}
