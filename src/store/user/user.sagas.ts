import AbortController from 'abort-controller';
import {call, put, all, takeEvery, cancelled} from 'redux-saga/effects';

import * as api from '../../configs/api.configs';
import {getTokenAsync} from '../common.sagas';

import * as globalStateActions from '../globalState/globalState.actions';
import * as userActions from './user.actions';

function* setUserProfileActionAsync({
  payload: {profile, reservePrayingTime},
}: ReturnType<typeof userActions.setUserProfileActionAsync.request>) {
  yield put(globalStateActions.resetState('setUser'));
  yield put(globalStateActions.setLoadingState('setUser', true));
  const controller = new AbortController();
  const {signal} = controller;

  try {
    const token = yield call(getTokenAsync);
    const {data} = yield call(api.createPrayer, signal, {
      ...profile,
      reservePrayingTime,
      token,
    });
    yield put(
      userActions.setUserProfileActionAsync.success({
        profile: {
          firstName: data.name.first,
          lastName: data.name.last,
          phoneNumber: data.phone,
        },
        reservePrayingTime: data.reservePrayingTime,
        creatingUserProfileDate: data.createdAt,
      }),
    );
    yield put(globalStateActions.setLoadingState('setUser', false));
  } catch (err) {
    yield put(userActions.setUserProfileActionAsync.failure());
    yield put(globalStateActions.setLoadingState('setUser', false));
    yield put(globalStateActions.setErrorState('setUser', err));
  } finally {
    if (yield cancelled()) {
      controller.abort();
      yield put(globalStateActions.setCancelState('setUser', true));
    }
  }
}

function* updateUserProfileActionAsync({
  payload: {...profile},
}: ReturnType<typeof userActions.updateUserProfileActionAsync.request>) {
  yield put(globalStateActions.resetState('updateUser'));
  yield put(globalStateActions.setLoadingState('updateUser', true));
  const controller = new AbortController();
  const {signal} = controller;

  try {
    const token = yield call(getTokenAsync);
    const {data} = yield call(api.updatePrayer, signal, {
      ...profile,
      token,
    });
    yield put(
      userActions.updateUserProfileActionAsync.success({
        profile: {
          firstName: data.name.first,
          lastName: data.name.last,
          phoneNumber: data.phone,
        },
        reservePrayingTime: data.reservePrayingTime,
        creatingUserProfileDate: data.createdAt,
      }),
    );
    yield put(globalStateActions.setLoadingState('updateUser', false));
  } catch (err) {
    yield put(userActions.updateUserProfileActionAsync.failure());
    yield put(globalStateActions.setLoadingState('updateUser', false));
    yield put(globalStateActions.setErrorState('updateUser', err));
  } finally {
    if (yield cancelled()) {
      controller.abort();
      yield put(globalStateActions.setCancelState('updateUser', true));
    }
  }
}

function* deleteUserProfileActionAsync() {
  yield put(globalStateActions.resetState('deleteUserProfile'));
  yield put(globalStateActions.setLoadingState('deleteUserProfile', true));
  const controller = new AbortController();
  const {signal} = controller;

  try {
    const token = yield call(getTokenAsync);
    yield call(api.deletePrayer, signal, {
      token,
    });
    yield put(userActions.deleteUserProfileActionAsync.success());
    yield put(globalStateActions.setLoadingState('deleteUserProfile', false));
  } catch (err) {
    yield put(userActions.deleteUserProfileActionAsync.failure());
    yield put(globalStateActions.setLoadingState('deleteUserProfile', false));
    yield put(globalStateActions.setErrorState('deleteUserProfile', err));
  } finally {
    if (yield cancelled()) {
      controller.abort();
      yield put(globalStateActions.setCancelState('deleteUserProfile', true));
    }
  }
}

function* cancelPrayingReservationActionAsync() {
  yield put(globalStateActions.resetState('cancelPrayingReservation'));
  yield put(
    globalStateActions.setLoadingState('cancelPrayingReservation', true),
  );
  const controller = new AbortController();
  const {signal} = controller;

  try {
    const token = yield call(getTokenAsync);
    const {data} = yield call(api.updatePrayer, signal, {
      reservePrayingTime: null,
      token,
    });
    yield put(
      userActions.cancelPrayingReservationActionAsync.success({
        reservePrayingTime: data.reservePrayingTime
          ? data.reservePrayingTime
          : undefined,
      }),
    );
    yield put(
      globalStateActions.setLoadingState('cancelPrayingReservation', false),
    );
  } catch (err) {
    yield put(userActions.cancelPrayingReservationActionAsync.failure());
    yield put(
      globalStateActions.setLoadingState('cancelPrayingReservation', false),
    );
    yield put(
      globalStateActions.setErrorState('cancelPrayingReservation', err),
    );
  } finally {
    if (yield cancelled()) {
      controller.abort();
      yield put(
        globalStateActions.setCancelState('cancelPrayingReservation', true),
      );
    }
  }
}

function* rootSaga() {
  yield all([
    takeEvery(
      userActions.setUserProfileActionAsync.request,
      setUserProfileActionAsync,
    ),
    takeEvery(
      userActions.updateUserProfileActionAsync.request,
      updateUserProfileActionAsync,
    ),
    takeEvery(
      userActions.deleteUserProfileActionAsync.request,
      deleteUserProfileActionAsync,
    ),
    takeEvery(
      userActions.cancelPrayingReservationActionAsync.request,
      cancelPrayingReservationActionAsync,
    ),
  ]);
}

export {rootSaga as UserRootSaga};
