import {combineReducers, Dispatch} from 'redux';
import {all, fork} from 'redux-saga/effects';
import {UserState, UserAction, UserReducer, UserRootSaga} from './user';
import {
  FridayPrayingState,
  FridayPrayingAction,
  FridayPrayingReducer,
  FridayPrayingRootSaga,
} from './fridayPraying';
import {
  GlobalState,
  GlobalStateAction,
  GlobalStateReducer,
} from './globalState';

export interface ApplicationState {
  global: GlobalState;
  user: UserState;
  fridayPraying: FridayPrayingState;
}

export type ApplicationAction =
  | UserAction
  | GlobalStateAction
  | FridayPrayingAction;

export type ApplicationDispatch = Dispatch<ApplicationAction>;

export const RootReducer = combineReducers({
  user: UserReducer,
  global: GlobalStateReducer,
  fridayPraying: FridayPrayingReducer,
});

export function* RootSaga() {
  yield all([fork(UserRootSaga), fork(FridayPrayingRootSaga)]);
}
