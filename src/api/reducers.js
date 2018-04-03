import {API_CLOSED, API_CONNECTED, API_ERROR} from "./actions";

const statuses = {
  [API_CONNECTED]: 'OK',
  [API_ERROR]: 'NOK',
  [API_CLOSED]: 'CLOSED',
};

const initialState = {status: 'CLOSED'};

export const reducers = (state = initialState, {type}) =>
  statuses[type] ? {status: statuses[type]} : state;
