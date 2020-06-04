import {combineReducers, Dispatch} from 'redux';
import {all, fork} from 'redux-saga/effects';
import {UserState, UserAction, UserReducer, userRootSaga} from './user';
import {
  GlobalState,
  GlobalStateAction,
  GlobalStateReducer,
} from './globalState';

export interface ApplicationState {
  global: GlobalState;
  user: UserState;
}

export type ApplicationAction = UserAction | GlobalStateAction;

export type ApplicationDispatch = Dispatch<ApplicationAction>;

export const RootReducer = combineReducers({
  user: UserReducer,
  global: GlobalStateReducer,
});

export function* RootSaga() {
  yield all([fork(userRootSaga)]);
}
