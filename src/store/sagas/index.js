import {all, takeLatest} from 'redux-saga/effects';
import {createClient} from '../../model/service/Client';

const client = createClient();

export default function* root() {
  yield all([]);
}
