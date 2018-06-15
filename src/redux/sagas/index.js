import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import fetchStreets from './streetSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    fetchStreets()
    // watchIncrementAsync()
  ]);
}
