import AbortController from 'abort-controller';

import {
  all,
  fork,
  call,
  put,
  takeLatest,
  take,
  cancel,
  cancelled,
} from 'redux-saga/effects';

import * as api from '../../configs/api.configs';
import {getTokenAsync} from '../common.sagas';

import * as globalStateActions from '../globalState/globalState.actions';
import * as FridayPrayingActions from './fridayPraying.actions';
import * as userActions from '../user/user.actions';

function* getFridayPrayingActionAsync() {
  function* task() {
    yield put(globalStateActions.resetState('getFridayPraying'));
    yield put(globalStateActions.setLoadingState('getFridayPraying', true));
    const controller = new AbortController();
    const {signal} = controller;

    let token;
    try {
      token = yield call(getTokenAsync);
    } catch (err) {}
    try {
      let data;
      if (token) {
        const {
          data: {settings, prayer},
        } = yield call(api.getFridayPrayingForUser, signal, {
          token,
        });
        data = settings;
        yield put(userActions.setUserToken(prayer.token));
        yield put(
          userActions.setUserProfileActionAsync.success({
            profile: {
              firstName: prayer.name.first,
              lastName: prayer.name.last,
              phoneNumber: prayer.phone,
            },
            reservePrayingTime: prayer.reservePrayingTime
              ? prayer.reservePrayingTime
              : null,
            creatingUserProfileDate: prayer.updatedAt,
          }),
        );
      } else {
        const {
          data: {settings, prayer},
        } = yield call(api.getFridayPraying, signal);
        data = settings;
        yield put(userActions.setUserToken(prayer.token));
      }
      yield put(
        FridayPrayingActions.getFridayPrayingActionAsync.success({
          times: [
            {
              time: `${data.nextFridayData} ${data.firstPraying.time}`,
              personSpaceLeft: data.firstPraying.personSpaceLeft,
            },
            {
              time: `${data.nextFridayData} ${data.secondPraying.time}`,
              personSpaceLeft: data.secondPraying.personSpaceLeft,
            },
          ],
          nextFridayData: data.nextFridayData,
        }),
      );
      yield put(globalStateActions.setLoadingState('getFridayPraying', false));
    } catch (err) {
      yield put(FridayPrayingActions.getFridayPrayingActionAsync.failure());
      yield put(globalStateActions.setLoadingState('getFridayPraying', false));
      yield put(globalStateActions.setErrorState('getFridayPraying', err));
    } finally {
      if (yield cancelled()) {
        controller.abort();
        yield put(
          globalStateActions.setLoadingState('getFridayPraying', false),
        );
        yield put(globalStateActions.setCancelState('getFridayPraying', true));
      }
    }
  }
  const bgTask = yield takeLatest(
    FridayPrayingActions.getFridayPrayingActionAsync.request,
    task,
  );

  yield take(FridayPrayingActions.getFridayPrayingActionAsync.cancel);

  yield cancel(bgTask);
}

function* rootSaga() {
  yield all([fork(getFridayPrayingActionAsync)]);
}

export {rootSaga as FridayPrayingRootSaga};
