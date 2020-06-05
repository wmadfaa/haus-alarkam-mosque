import {select} from 'redux-saga/effects';
import * as selectors from './selectors';

export function* getTokenAsync() {
  try {
    const token: ReturnType<typeof selectors.getToken> = yield select(
      selectors.getToken,
    );
    if (!token) {
      throw new Error('token is missing');
    }
    return token;
  } catch (err) {
    throw err;
  }
}
