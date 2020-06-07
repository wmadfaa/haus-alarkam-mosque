import {Reducer} from 'redux';
import {ActionType} from 'typesafe-actions';
import {mergeState} from '../helpers';
import * as FridayPrayingActions from './fridayPraying.actions';
import {
  FridayPrayingState,
  FridayPrayingActionTypes,
} from './fridayPraying.types';

export type FridayPrayingAction = ActionType<typeof FridayPrayingActions>;

export const initialState: FridayPrayingState = {};

const reducer: Reducer<FridayPrayingState, FridayPrayingAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FridayPrayingActionTypes.GET_FRIDAY_PRAYING_SUCCESS: {
      return mergeState(state, action.payload);
    }
    default: {
      return state;
    }
  }
};

export {reducer as FridayPrayingReducer};
