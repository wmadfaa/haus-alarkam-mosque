import {Reducer} from 'redux';
import merge from 'lodash.merge';
import {ActionType} from 'typesafe-actions';
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
      return merge({...state}, {...action.payload});
    }
    default: {
      return state;
    }
  }
};

export {reducer as FridayPrayingReducer};
