import {ApplicationState} from './index';

export const getToken = (state: ApplicationState) => state.user.token;
export const getProfile = (state: ApplicationState) => state.user.profile;
