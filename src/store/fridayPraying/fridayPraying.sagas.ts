import AbortController from 'abort-controller';
import {call, put, all, takeEvery, cancelled} from 'redux-saga/effects';

import * as api from '../../configs/api.configs';
import {getTokenAsync} from '../common.sagas';

import * as globalStateActions from '../globalState/globalState.actions';
import * as FridayPrayingActions from './fridayPraying.actions';
import * as userActions from '../user/user.actions';

function* getFridayPrayingActionAsync() {
  yield put(globalStateActions.resetState('getFridayPraying'));
  yield put(globalStateActions.setLoadingState('getFridayPraying', true));
  const controller = new AbortController();
  const {signal} = controller;

  try {
    const token = yield call(getTokenAsync);
    let data;
    if (token) {
      const {
        data: {settings, prayer},
      } = yield call(api.getFridayPrayingForUser, signal, {token});
      data = settings;
      yield put(
        userActions.setUserProfileActionAsync.success({
          profile: {
            firstName: prayer.name.first,
            lastName: prayer.name.last,
            phoneNumber: prayer.phone,
          },
          reservePrayingTime: prayer.reservePrayingTime
            ? new Date(prayer.reservePrayingTime)
            : null,
          creatingUserProfileDate: new Date(prayer.updatedAt),
        }),
      );
    } else {
      const {
        data: {settings},
      } = yield call(api.getFridayPraying, signal);
      data = settings;
    }
    yield put(
      FridayPrayingActions.getFridayPrayingActionAsync.success({
        times: [
          {
            time: new Date(data.firstPraying.time),
            personSpaceLeft: data.firstPraying.personSpaceLeft,
          },
          {
            time: new Date(data.secondPraying.time),
            personSpaceLeft: data.secondPraying.personSpaceLeft,
          },
        ],
        nextFridayData: new Date(data.nextFridayData),
      }),
    );
    yield put(globalStateActions.setLoadingState('getFridayPraying', false));
  } catch (err) {
    yield put(FridayPrayingActions.getFridayPrayingActionAsync.failure());
    yield put(globalStateActions.setErrorState('getFridayPraying', err));
  } finally {
    if (yield cancelled()) {
      controller.abort();
      yield put(globalStateActions.setCancelState('getFridayPraying', true));
    }
  }
}

function* rootSaga() {
  yield all([
    takeEvery(
      FridayPrayingActions.getFridayPrayingActionAsync.request,
      getFridayPrayingActionAsync,
    ),
  ]);
}

export {rootSaga as FridayPrayingRootSaga};
