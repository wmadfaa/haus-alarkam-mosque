import {createAsyncAction, action} from 'typesafe-actions';
import {UserActionTypes, UserProfile} from './user.types';

export const setUserToken = (token: string) =>
  action(UserActionTypes.SET_USER_TOKEN, token);

export const setReservePrayingTime = (time: Date) =>
  action(UserActionTypes.SET_RESERVE_PRAYING_TIME, time);

export const setUserProfileActionAsync = createAsyncAction(
  UserActionTypes.SET_USER_PROFILE_REQUEST,
  UserActionTypes.SET_USER_PROFILE_SUCCESS,
  UserActionTypes.SET_USER_PROFILE_FAILURE,
  UserActionTypes.SET_USER_PROFILE_CANCEL,
)<
  {profile: UserProfile; reservePrayingTime: Date},
  {
    profile: UserProfile;
    reservePrayingTime: Date;
    creatingUserProfileDate: Date;
  },
  undefined,
  undefined
>();

export const updateUserProfileActionAsync = createAsyncAction(
  UserActionTypes.UPDATE_USER_PROFILE_REQUEST,
  UserActionTypes.UPDATE_USER_PROFILE_SUCCESS,
  UserActionTypes.UPDATE_USER_PROFILE_FAILURE,
  UserActionTypes.UPDATE_USER_PROFILE_CANCEL,
)<
  Partial<UserProfile>,
  {
    profile: UserProfile;
    reservePrayingTime: Date;
    creatingUserProfileDate: Date;
  },
  undefined,
  undefined
>();

export const deleteUserProfileActionAsync = createAsyncAction(
  UserActionTypes.DELETE_USER_PROFILE_REQUEST,
  UserActionTypes.DELETE_USER_PROFILE_SUCCESS,
  UserActionTypes.DELETE_USER_PROFILE_FAILURE,
  UserActionTypes.DELETE_USER_PROFILE_CANCEL,
)<undefined, undefined, undefined, undefined>();

export const cancelPrayingReservationActionAsync = createAsyncAction(
  UserActionTypes.CANCEL_PRAYING_RESERVATION_REQUEST,
  UserActionTypes.CANCEL_PRAYING_RESERVATION_SUCCESS,
  UserActionTypes.CANCEL_PRAYING_RESERVATION_FAILURE,
  UserActionTypes.CANCEL_PRAYING_RESERVATION_CANCEL,
)<undefined, {reservePrayingTime?: Date}, undefined, undefined>();
