export enum FridayPrayingActionTypes {
  GET_FRIDAY_PRAYING_REQUEST = '@@fridayPraying/GET_FRIDAY_PRAYING_REQUEST',
  GET_FRIDAY_PRAYING_SUCCESS = '@@fridayPraying/GET_FRIDAY_PRAYING_SUCCESS',
  GET_FRIDAY_PRAYING_FAILURE = '@@fridayPraying/GET_FRIDAY_PRAYING_FAILURE',
  GET_FRIDAY_PRAYING_CANCEL = '@@fridayPraying/GET_FRIDAY_PRAYING_CANCEL',
}

export interface FridayPrayingTime {
  time: string;
  personSpaceLeft: number;
}

export interface FridayPrayingState {
  times?: FridayPrayingTime[];
  nextFridayData?: string;
}
