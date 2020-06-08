import {action} from 'typesafe-actions';
import {GlobalStateActionTypes, States, State} from './globalState.types';

export const setRememberUser = (value: boolean) =>
  action(GlobalStateActionTypes.SET_REMEMBER_USER, value);

export const setLoadingState = (state: States, value: State['loading']) =>
  action(GlobalStateActionTypes.SET_LOADING_STATE, {state, value});

export const setErrorState = (state: States, value: State['error']) =>
  action(GlobalStateActionTypes.SET_ERROR_STATE, {state, value});

export const removeErrorState = (state: States) =>
  action(GlobalStateActionTypes.REMOVE_ERROR_STATE, state);

export const setCancelState = (state: States, value: State['canceled']) =>
  action(GlobalStateActionTypes.SET_CANCEL_STATE, {state, value});

export const resetState = (state: States) =>
  action(GlobalStateActionTypes.RESET_STATE, {state});
