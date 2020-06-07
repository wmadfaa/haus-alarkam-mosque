import {Reducer} from 'redux';
import {ActionType} from 'typesafe-actions';
import omit from 'lodash.omit';
import {mergeState} from '../helpers';
import * as UserActions from './user.actions';
import {UserState, UserActionTypes} from './user.types';

export type UserAction = ActionType<typeof UserActions>;

export const initialState: UserState = {};

const reducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_TOKEN: {
      return mergeState(state, {token: action.payload});
    }
    case UserActionTypes.SET_RESERVE_PRAYING_TIME: {
      return mergeState(state, {reservePrayingTime: action.payload});
    }
    case UserActionTypes.SET_USER_PROFILE_SUCCESS: {
      return mergeState(state, action.payload);
    }
    case UserActionTypes.UPDATE_USER_PROFILE_SUCCESS: {
      return mergeState(state, action.payload);
    }
    case UserActionTypes.DELETE_USER_PROFILE_SUCCESS: {
      return omit(state, 'profile');
    }
    case UserActionTypes.CANCEL_PRAYING_RESERVATION_SUCCESS: {
      return omit(state, 'reservePrayingTime');
    }
    default: {
      return state;
    }
  }
};

export {reducer as UserReducer};
