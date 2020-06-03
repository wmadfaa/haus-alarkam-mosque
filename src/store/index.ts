import {combineReducers, Dispatch} from 'redux';
import {all} from 'redux-saga/effects';
import {FriendsState, FriendsAction, FriendsReducer} from './user';

export interface ApplicationState {
  user: FriendsState;
}

export type ApplicationAction = FriendsAction;

export type ApplicationDispatch = Dispatch<ApplicationAction>;

export const RootReducer = combineReducers({
  user: FriendsReducer,
});

export function* RootSaga() {
  yield all([]);
}
