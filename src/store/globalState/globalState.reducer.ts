import {Reducer} from 'redux';
import {ActionType} from 'typesafe-actions';
import * as GlobalStateActions from './globalState.actions';
import {GlobalState, GlobalStateActionTypes} from './globalState.types';
import {mergeState} from '../helpers';

export type GlobalStateAction = ActionType<typeof GlobalStateActions>;

export const initialState: GlobalState = {
  rememberUser: false,
  setUser: {
    loading: false,
    canceled: false,
    error: null,
  },
  updateUser: {
    loading: false,
    canceled: false,
    error: null,
  },
  cancelPrayingReservation: {
    loading: false,
    canceled: false,
    error: null,
  },
  deleteUserProfile: {
    loading: false,
    canceled: false,
    error: null,
  },
  getFridayPraying: {
    loading: false,
    canceled: false,
    error: null,
  },
};

const reducer: Reducer<GlobalState, GlobalStateAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case GlobalStateActionTypes.SET_REMEMBER_USER: {
      return mergeState(state, {
        rememberUser: action.payload,
      });
    }
    case GlobalStateActionTypes.SET_LOADING_STATE: {
      return mergeState(state, {
        [action.payload.state]: {loading: action.payload.value},
      });
    }
    case GlobalStateActionTypes.SET_CANCEL_STATE: {
      return mergeState(state, {
        [action.payload.state]: {canceled: action.payload.value},
      });
    }
    case GlobalStateActionTypes.SET_ERROR_STATE: {
      return mergeState(state, {
        [action.payload.state]: {error: action.payload.value},
      });
    }
    case GlobalStateActionTypes.REMOVE_ERROR_STATE: {
      return mergeState(state, {[action.payload]: {error: null}});
    }
    case GlobalStateActionTypes.RESET_STATE: {
      return mergeState(state, {
        [action.payload.state]: initialState[action.payload.state],
      });
    }
    default: {
      return state;
    }
  }
};

export {reducer as GlobalStateReducer};
