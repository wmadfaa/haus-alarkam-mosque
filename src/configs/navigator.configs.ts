export enum ROUTES {
  LOADING = 'loading',
  HOME = 'home',
  SIGN_IN = 'sign-in',
  SIGN_IN_FORM = 'sign-in/form',
  SIGN_IN_USER = 'sign-in/user',
  CONTROL = 'control',
}

export type SignInParams = {
  reservePrayingTime: string;
};

export type SignInStackParams = {
  [ROUTES.SIGN_IN_FORM]: SignInParams;
  [ROUTES.SIGN_IN_USER]: SignInParams;
};

export type MainStackParams = {
  [ROUTES.LOADING]: undefined;
  [ROUTES.HOME]: undefined;
  [ROUTES.SIGN_IN]: {
    params: SignInParams;
    screen?: keyof SignInStackParams;
  };
  [ROUTES.CONTROL]: undefined;
};
