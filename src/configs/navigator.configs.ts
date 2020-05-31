export enum ROUTES {
  HOME = 'home',
  SIGN_IN = 'sign-in',
}

export type MainStackParams = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SIGN_IN]: undefined;
};
