import {ApplicationState} from './index';

export const getToken = (state: ApplicationState) => state.user.token;
