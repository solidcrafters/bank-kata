import {API_CLOSED, API_CONNECTED, API_ERROR} from "./actions";

const statuses = {
  [API_CONNECTED]: 'OK',
  [API_ERROR]: 'NOK',
  [API_CLOSED]: 'CLOSED',
};

export const reducers = (state = {status: 'CLOSED'}, {type}) =>
  statuses[type] ? {status: statuses[type]} : state;

