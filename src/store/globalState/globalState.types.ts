export enum GlobalStateActionTypes {
  SET_LOADING_STATE = '@@globalState/SET_LOADING_STATE',
  SET_ERROR_STATE = '@@globalState/SET_ERROR_STATE',
  REMOVE_ERROR_STATE = '@@globalState/REMOVE_ERROR_STATE',
  SET_CANCEL_STATE = '@@globalState/SET_CANCEL_STATE',
}

export type States = 'setUser' | 'updateUser' | 'cancelPrayingReservation';

export interface State {
  readonly loading: boolean;
  readonly canceled: boolean;
  readonly error: Error | null;
}

export type GlobalState = Record<States, State>;
