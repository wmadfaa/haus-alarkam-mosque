import {select} from 'redux-saga/effects';
import * as selectors from './selectors';

export function* getTokenAsync() {
  const token: ReturnType<typeof selectors.getToken> = yield select(
    selectors.getToken,
  );
  const profile: ReturnType<typeof selectors.getProfile> = yield select(
    selectors.getProfile,
  );
  if (!token || !profile) {
    return;
  }
  return token;
}
