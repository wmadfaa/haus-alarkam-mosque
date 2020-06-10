import AbortController from 'abort-controller';

import {all, call, put, takeEvery, cancelled} from 'redux-saga/effects';

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
    let data;
    const token = yield call(getTokenAsync);
    if (token) {
      const res = yield call(api.getFridayPrayingForUser, signal, {
        token,
      });
      data = res.settings;
      yield put(userActions.setUserToken(res.prayer.token));
      yield put(
        userActions.setUserProfileActionAsync.success({
          profile: {
            firstName: res.prayer.name.first,
            lastName: res.prayer.name.last,
            phoneNumber: res.prayer.phone,
          },
          reservePrayingTime: res.prayer.reservePrayingTime
            ? res.prayer.reservePrayingTime
            : null,
          creatingUserProfileDate: res.prayer.updatedAt,
        }),
      );
    } else {
      const res = yield call(api.getFridayPraying, signal);
      data = res.settings;
      yield put(userActions.setUserToken(res.prayer.token));
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
      yield put(globalStateActions.setLoadingState('getFridayPraying', false));
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
