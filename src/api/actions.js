export const API_CONNECTED = 'API_CONNECTED';
export const apiConnected = () => ({
  type: API_CONNECTED
});

export const API_ERROR = 'API_ERROR';
export const apiError = (error) => ({
  type: API_ERROR,
  payload: {error}
});

export const API_CLOSED = 'API_CLOSED';
export const apiClosed = () => ({
  type: API_CLOSED
});
