import {createAsyncAction} from 'typesafe-actions';
import {
  FridayPrayingActionTypes,
  FridayPrayingTime,
} from './fridayPraying.types';

export const getFridayPrayingActionAsync = createAsyncAction(
  FridayPrayingActionTypes.GET_FRIDAY_PRAYING_REQUEST,
  FridayPrayingActionTypes.GET_FRIDAY_PRAYING_SUCCESS,
  FridayPrayingActionTypes.GET_FRIDAY_PRAYING_FAILURE,
  FridayPrayingActionTypes.GET_FRIDAY_PRAYING_CANCEL,
)<
  undefined,
  {times: FridayPrayingTime[]; nextFridayData: string},
  undefined,
  undefined
>();
