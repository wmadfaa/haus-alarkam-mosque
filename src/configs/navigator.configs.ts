export enum ROUTES {
  HOME = 'home',
  SIGN_IN = 'sign-in',
  CONTROL = 'control',
}

export type MainStackParams = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SIGN_IN]: undefined;
  [ROUTES.CONTROL]: undefined;
};
